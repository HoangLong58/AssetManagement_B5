package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.request.ChangePassRequestDto;
import com.nashtech.assetmanagement.dto.request.LoginRequestDto;
import com.nashtech.assetmanagement.dto.request.UserRequestDto;
import com.nashtech.assetmanagement.dto.response.*;
import com.nashtech.assetmanagement.entities.Location;
import com.nashtech.assetmanagement.entities.Role;
import com.nashtech.assetmanagement.entities.Users;
import com.nashtech.assetmanagement.enums.UserState;
import com.nashtech.assetmanagement.exception.DateInvalidException;
import com.nashtech.assetmanagement.exception.ResourceNotFoundException;
import com.nashtech.assetmanagement.mapper.LocationMapper;
import com.nashtech.assetmanagement.mapper.UserMapper;
import com.nashtech.assetmanagement.mapper.UsersContent;
import com.nashtech.assetmanagement.repositories.AssignmentRepository;
import com.nashtech.assetmanagement.repositories.LocationRepository;
import com.nashtech.assetmanagement.repositories.RoleRepository;
import com.nashtech.assetmanagement.repositories.UserRepository;
import com.nashtech.assetmanagement.sercurity.jwt.JwtUtils;
import com.nashtech.assetmanagement.sercurity.userdetail.UserPrinciple;
import com.nashtech.assetmanagement.service.AuthenticationService;
import com.nashtech.assetmanagement.service.UserService;
import com.nashtech.assetmanagement.utils.UserGenerateUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UsersContent usersContent;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationService authenticationService;
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;
    private final ModelMapper modelMapper;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UsersContent usersContent, RoleRepository roleRepository,
                           UserMapper userMapper, AuthenticationManager authenticationManager, JwtUtils jwtUtils,
                           PasswordEncoder passwordEncoder, LocationRepository locationRepository, LocationMapper locationMapper,
                           AuthenticationService authenticationService, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.usersContent = usersContent;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.authenticationService = authenticationService;
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean isUsernameExist(String username) {
        return userRepository.existsByUserName(username);
    }

    @Override
    public SignInResponseDto signIn(LoginRequestDto requestLoginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestLoginDTO.getUserName(), requestLoginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return new SignInResponseDto(userPrinciple.getStaffCode(), userPrinciple.getUsername(),
                userPrinciple.getState(), userPrinciple.getAuthorities(), token);
    }

    @Override
    public UserContentResponseDto createNewUser(UserRequestDto user) {

        Optional<Location> location = locationRepository.findByName(user.getLocationName());
        Optional<Role> role = roleRepository.findByName(user.getRoleName());
        if (location.isEmpty()) {
            throw new ResourceNotFoundException("Location name not found");
        }
        if (role.isEmpty()) {
            throw new ResourceNotFoundException("Role name not found");
        }
        Users newUser = userMapper.MapToUser(user, role.get(), location.get());
        List<String> staffCodeList = userRepository.findAllStaffCode();
        int biggestStaffCode = UserGenerateUtil.getBiggestStaffCode(staffCodeList);
        String pattern = newUser.getLastName().substring(0, 1);
        int sameName = userRepository.countUsersByFirstNameAndLastNameLikeIgnoreCase(newUser.getFirstName(), (pattern + "%"));
        newUser.setState(UserState.INIT);
        newUser.setStaffCode(UserGenerateUtil.generateStaffCode(biggestStaffCode));
        newUser.setUserName(UserGenerateUtil.generateUserName(newUser.getFirstName(), newUser.getLastName(), sameName));
        newUser.setPassword(new BCryptPasswordEncoder()
                .encode(UserGenerateUtil.generatePassword(newUser.getUserName(), newUser.getBirthDate())));
        userRepository.save(newUser);
        UserContentResponseDto responseUser = modelMapper.map(newUser, UserContentResponseDto.class);
        return responseUser;
    }

    @Override
    public UserContentResponseDto editUser(UserRequestDto user, String staffCode) {
        Optional<Users> usersOptional = userRepository.findByStaffCode(staffCode);
        Optional<Role> roleOptional = roleRepository.findByName(user.getRoleName());
        if (usersOptional.isEmpty()) {
            throw new ResourceNotFoundException("Staff code not found");
        }
        if (roleOptional.isEmpty()) {
            throw new ResourceNotFoundException("Role name not found");
        }
        Users editUser = usersOptional.get();
        Role role = roleOptional.get();
        userMapper.requestDtoToUser(editUser, user, role);
        userRepository.save(editUser);
        UserContentResponseDto responseUser = modelMapper.map(editUser, UserContentResponseDto.class);
        return responseUser;
    }

    @Override
    public LocationResponseDto getLocationByStaffCode(String staffCode) {
        Optional<Users> usersOptional = userRepository.findByStaffCode(staffCode);
        if (usersOptional.isEmpty()) {
            throw new ResourceNotFoundException("Staff code not found");
        }
        Users users = usersOptional.get();
        Location location = users.getLocation();
        return locationMapper.locationToLocationDTO(location);
    }

    @Override
    public List<UserContentResponseDto> getUsersByStaffCodeOrNameAndLocationCode(String text, String locationCode) {
        Optional<Location> location = locationRepository.findById(locationCode);
        if (location.isEmpty()) {
            throw new ResourceNotFoundException("Location code not found");
        }
        List<Users> usersList = userRepository.findByStaffCodeOrNameAndLocationCode(text.toLowerCase(), locationCode);
        List<UserContentResponseDto> userDtoList = userMapper.mapListUserToListUserDto(usersList);
        return userDtoList;
    }


    @Override
    public ListUsersResponseDto getAllUsersBySearchingStaffCodeOrNameOrRole(int pageNo,
                                                                            int pageSize,
                                                                            String sortBy,
                                                                            String sortDirection,
                                                                            String searchText,
                                                                            List<String> rolesName) {

        Users user = authenticationService.getUser();
        String loggedStaffCode = user.getStaffCode();
        String location = user.getLocation().getCode();
        Pageable pageable = PageRequest.of(pageNo, pageSize, defaultSorting(sortBy, sortDirection));

        Page<Users> users = userRepository.searchByStaffCodeOrNameWithRole(
                searchText.toLowerCase(),
                loggedStaffCode.replaceAll(" ", ""),
                location.toLowerCase(),
                rolesName,
                pageable
        );

        return usersContent.getUsersContent(users);
    }

    @Override
    public UserPrinciple loadUserByUsername(String userName) throws UsernameNotFoundException {
        Users user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new ResourceNotFoundException("Did not find user has username = " + userName));
        return UserPrinciple.build(user);
    }


    @Override
    public SingleUserResponseDto getUserDetailInfo(String staffCode) {
        Users user = userRepository.findById(staffCode)
                .orElseThrow(() -> new ResourceNotFoundException("User " + staffCode + " not found"));

        return userMapper.convertUserEntityToSingleUserResponse(user);
    }

    public Sort defaultSorting(String sortBy, String sortDirection) {
        return sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
    }

    @Override
    public MessageResponse changePasswordFirstLogin(String userName, String newPassword) {
        Users user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new ResourceNotFoundException("Did not find user " + "with username: " + userName));
        if (user.getState() != UserState.INIT) {
            return new MessageResponse(HttpStatus.CONFLICT,
                    "You don't have to " + "change your password for the first time you log in because your "
                            + "password has already been changed.",
                    new Date());
        }
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return new MessageResponse(HttpStatus.CONFLICT,
                    "The new password must be " + "different from the previous password.", new Date());
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setState(UserState.ACTIVE);
            userRepository.save(user);
        }
        return new MessageResponse(HttpStatus.OK, "Change password successfully.", new Date());
    }

    @Override
    public UserResponseDto changePassword(ChangePassRequestDto dto) {
        Optional<Users> optional = userRepository.findById(dto.getStaffCode());
        if (!optional.isPresent()) {
            throw new ResourceNotFoundException(String.format("user.not.found.with.staff.code:%s", dto.getStaffCode()));
        }
        Users user = optional.get();
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Password is incorrect");
        } else if (passwordEncoder.matches(dto.getNewPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("You entered an old password");
        } else {
            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            user = userRepository.save(user);
            UserResponseDto repDto = modelMapper.map(user, UserResponseDto.class);
            return repDto;
        }
    }

    @Override
    public void checkExistsAssignment(String staffCode) {
        Optional<Users> optional = userRepository.findById(staffCode);
        if (!optional.isPresent()) {
            throw new ResourceNotFoundException(String.format("staff.not.found.with.code:%s", staffCode));
        }
        Users user = optional.get();
        boolean existInAssignment = assignmentRepository.existsByAssignedToOrAssignedBy(user, user);
        if (existInAssignment) {
            throw new DateInvalidException("exist.valid.assignments");
        }
    }

    public UserResponseDto disableStaff(String staffCode) {
        Optional<Users> optional = userRepository.findById(staffCode);
        if (!optional.isPresent()) {
            throw new ResourceNotFoundException(String.format("staff.not.found.with.code:%s", staffCode));
        }
        Users user = optional.get();
        user.setState(UserState.INACTIVE);
        userRepository.save(user);
        UserResponseDto dto = modelMapper.map(user, UserResponseDto.class);
        return dto;
    }
}
