package com.nashtech.assetmanagement.service.impl;

import com.nashtech.assetmanagement.dto.request.ChangePassRequestDto;
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
import com.nashtech.assetmanagement.service.AuthenticationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @Mock
    UserRepository userRepository;
    @Mock
    UsersContent usersContent;
    @Mock
    RoleRepository roleRepository;
    @Mock
    UserMapper userMapper;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    JwtUtils jwtUtils;
    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    AuthenticationService authenticationService;
    @Mock
    LocationRepository locationRepository;
    @Mock
    LocationMapper locationMapper;
    @Mock
    ModelMapper modelMapper;
    @InjectMocks
    UserServiceImpl userServiceImpl;

    @Mock
    AssignmentRepository assignmentRepository;

    @Test
    void createNewUser_ShouldReturnUserDto_WhenRequestValid() {
        Location location = mock(Location.class);
        Role role = mock(Role.class);
        Users user = mock(Users.class);
        UserRequestDto userRequest = mock(UserRequestDto.class);
        UserContentResponseDto userResponse = mock(UserContentResponseDto.class);
        when(locationRepository.findByName(userRequest.getLocationName())).thenReturn(Optional.of(location));
        when(roleRepository.findByName(userRequest.getRoleName())).thenReturn(Optional.of(role));
        when(userMapper.MapToUser(userRequest, role, location)).thenReturn(user);
        when(user.getFirstName()).thenReturn("firstname");
        when(user.getLastName()).thenReturn("lastname");
        when(user.getBirthDate()).thenReturn(new Date());
        when(modelMapper.map(user, UserContentResponseDto.class)).thenReturn(userResponse);
        UserContentResponseDto result = userServiceImpl.createNewUser(userRequest);
        assertThat(result).isEqualTo(userResponse);
    }

    @Test
    void getAllUsersBySearchingStaffCodeOrNameOrRole_ShouldReturnListUsersResponseDto_WhenTheRequestIsValid() {
        //given
        int pageNo = 1;
        int pageSize = 10;
        String sortBy = "firstName";
        String sortDirection = "ASC";
        String searchText = "SD0001";
        Users user = mock(Users.class);
        List roles = List.of("ADMIN", "STAFF");
        Location location = mock(Location.class);

        when(authenticationService.getUser()).thenReturn(user);
        when(user.getStaffCode()).thenReturn("SD0001");
        when(user.getLocation()).thenReturn(location);
        when(location.getCode()).thenReturn("HCM");
        PageRequest pageRequest = mock(PageRequest.class);

        var pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        var pageCaptor = ArgumentCaptor.forClass(Page.class);
        var textCaptor = ArgumentCaptor.forClass(String.class);
        var staffCodeCaptor = ArgumentCaptor.forClass(String.class);
        var locationCaptor = ArgumentCaptor.forClass(String.class);
        //when
        userServiceImpl.getAllUsersBySearchingStaffCodeOrNameOrRole(
                pageNo, pageSize, sortBy, sortDirection, searchText, roles);

        //then
        verify(userRepository).searchByStaffCodeOrNameWithRole(
                textCaptor.capture(),
                staffCodeCaptor.capture(),
                locationCaptor.capture(),
                eq(roles),
                pageableCaptor.capture());
        assertThat(textCaptor.getValue()).isEqualTo(searchText.toLowerCase());
        assertThat(staffCodeCaptor.getValue()).isEqualTo("SD0001".replaceAll(" ",""));
        assertThat(locationCaptor.getValue()).isEqualTo("HCM".toLowerCase());
        assertThat(pageableCaptor.getValue())
                .isEqualTo(PageRequest.of(pageNo, pageSize, Sort.by(sortBy).ascending()));

        verify(usersContent).getUsersContent(pageCaptor.capture());
        assertThat(pageCaptor.getValue()).isEqualTo(userRepository.searchByStaffCodeOrNameWithRole(
                textCaptor.capture(),
                staffCodeCaptor.capture(),
                locationCaptor.capture(),
                eq(roles),
                pageableCaptor.capture()));
    }

    @Test
    void createNewUser_ShouldThrowResourceNotFoundEx_WhenRequestRoleNameIncorrect() {
        Location location = mock(Location.class);
        UserRequestDto userRequest = mock(UserRequestDto.class);
        when(locationRepository.findByName(userRequest.getLocationName())).thenReturn(Optional.of(location));
        when(roleRepository.findByName(userRequest.getRoleName())).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.createNewUser(userRequest));
        assertThat(e.getMessage()).isEqualTo("Role name not found");
    }

    @Test
    void createNewUser_ShouldThrowResourceNotFoundEx_WhenRequestLocationNameIncorrect() {
        Role role = mock(Role.class);
        UserRequestDto userRequest = mock(UserRequestDto.class);
        when(locationRepository.findByName(userRequest.getLocationName())).thenReturn(Optional.empty());
        when(roleRepository.findByName(userRequest.getRoleName())).thenReturn(Optional.of(role));
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.createNewUser(userRequest));
        assertThat(e.getMessage()).isEqualTo("Location name not found");
    }

    @Test
    void editUser_ShouldReturnUserDto_WhenStaffCodeAndRequestCorrect() {
        Role role = mock(Role.class);
        Users user = mock(Users.class);
        UserRequestDto userRequest = mock(UserRequestDto.class);
        UserContentResponseDto userResponse = mock(UserContentResponseDto.class);
        when(userRepository.findByStaffCode("sd0001")).thenReturn(Optional.of(user));
        when(roleRepository.findByName(userRequest.getRoleName())).thenReturn(Optional.of(role));
        when(modelMapper.map(user, UserContentResponseDto.class)).thenReturn(userResponse);
        UserContentResponseDto result = userServiceImpl.editUser(userRequest, "sd0001");
        assertThat(result).isEqualTo(userResponse);
    }

    @Test
    void editUser_ShouldThrowResourceNotFoundEx_WhenStaffCodeIncorrect() {
        UserRequestDto userRequest = mock(UserRequestDto.class);
        when(userRepository.findByStaffCode("sd0001")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.editUser(userRequest, "sd0001"));
        assertThat(e.getMessage()).isEqualTo("Staff code not found");
    }

    @Test
    void editUser_ShouldThrowResourceNotFoundEx_WhenRequestRoleIncorrect() {
        UserRequestDto userRequest = mock(UserRequestDto.class);
        Users user = mock(Users.class);
        when(userRepository.findByStaffCode("sd0001")).thenReturn(Optional.of(user));
        when(roleRepository.findByName(userRequest.getRoleName())).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.editUser(userRequest, "sd0001"));
        assertThat(e.getMessage()).isEqualTo("Role name not found");
    }

    @Test
    void getLocationByStaffCode_ShouldReturnLocationName_WhenStaffCodeCorrect() {
        Users user = mock(Users.class);
        Location location = mock(Location.class);
        LocationResponseDto response = mock(LocationResponseDto.class);
        when(userRepository.findByStaffCode("sd0001")).thenReturn(Optional.of(user));
        when(user.getLocation()).thenReturn(location);
        when(locationMapper.locationToLocationDTO(location)).thenReturn(response);
        LocationResponseDto result = userServiceImpl.getLocationByStaffCode("sd0001");
        assertThat(result).isEqualTo(response);
    }

    @Test
    void getLocationByStaffCode_ShouldThrowResourceNotFoundEx_WhenStaffCodeIncorrect() {
        when(userRepository.findByStaffCode("sd0001")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.getLocationByStaffCode("sd0001"));
        assertThat(e.getMessage()).isEqualTo("Staff code not found");
    }

    //US584-create new assignment
    @Test
    void getUserByStaffCodeOrName_ShouldReturnUserDtoList_WhenStaffCodeOrNameExist() {
        List<Users> usersList = mock(ArrayList.class);
        List<UserContentResponseDto> responseList = mock(ArrayList.class);
        Location location = mock(Location.class);
        when(locationRepository.findById("HCM")).thenReturn(Optional.of(location));
        when(userRepository.findByStaffCodeOrNameAndLocationCode("text", "HCM")).thenReturn(usersList);
        when(userMapper.mapListUserToListUserDto(usersList)).thenReturn(responseList);
        List<UserContentResponseDto> result = userServiceImpl.getUsersByStaffCodeOrNameAndLocationCode("text", "HCM");
        assertThat(result).isEqualTo(responseList);
    }

    @Test
    void getUserByStaffCodeOrName_ShouldThrowResourceNotFoundEx_WhenLocationCodeIncorrect() {
        when(locationRepository.findById("HCM")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> userServiceImpl.getUsersByStaffCodeOrNameAndLocationCode("text", "HCM"));
        assertThat(e.getMessage()).isEqualTo("Location code not found");
    }

    @Test
    void changePasswordFirstLogin_WhenUserStateIsNotINIT_Expect_ReturnResponseMessage() {
        Role role = mock(Role.class);
        Location location = mock(Location.class);
        Users users = new Users("SD0001", "duc", "nguyen", "ducnguyen", "123", null, null, true, UserState.ACTIVE, role,
                location, null);
        Optional<Users> usersOptional = Optional.of(users);
        when(userRepository.findByUserName("duc")).thenReturn(usersOptional);
        MessageResponse expected = new MessageResponse(HttpStatus.CONFLICT,
                "You don't " + "have to " + "change your password for the first time you log in because your "
                        + "password has already been changed.",
                new Date());
        MessageResponse actual = userServiceImpl.changePasswordFirstLogin("duc", "123");
        assertThat(actual.getMessage()).isEqualTo(expected.getMessage());
        assertThat(actual.getStatus()).isEqualTo(expected.getStatus());
    }

    @Test
    void changePasswordFirstLogin_WhenNewPasswordEqualNewPassword_Expect_ReturnResponseMessage() {
        Role role = mock(Role.class);
        Location location = mock(Location.class);
        Users users = new Users("SD0001", "duc", "nguyen", "ducnguyen", "123", null, null, true, UserState.INIT, role,
                location, null);
        Optional<Users> usersOptional = Optional.of(users);
        when(userRepository.findByUserName("duc")).thenReturn(usersOptional);
        when(passwordEncoder.matches("123", users.getPassword())).thenReturn(true);
        MessageResponse expected = new MessageResponse(HttpStatus.CONFLICT,
                "The new password must be " + "different from the previous password.", new Date());
        MessageResponse actual = userServiceImpl.changePasswordFirstLogin("duc", "123");
        assertThat(actual.getMessage()).isEqualTo(expected.getMessage());
        assertThat(actual.getStatus()).isEqualTo(expected.getStatus());
    }

//	=================================change password===========================================

    @DisplayName("change password throw password incorrect when user exist")
    @Test
    public void changePassword_shouldReturnExceptionPasswordIncorrect_whenUserIdExist() {
        Users entity = mock(Users.class);
        ChangePassRequestDto request = mock(ChangePassRequestDto.class);
        when(userRepository.findById(request.getStaffCode())).thenReturn(Optional.of(entity));
        when(passwordEncoder.matches(request.getPassword(), entity.getPassword())).thenReturn(false);
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            userServiceImpl.changePassword(request);
        });
        assertThat(exception.getMessage()).isEqualTo("Password is incorrect");
    }

    @DisplayName("change password throw same password when user exist")
    @Test
    public void changePassword_shouldReturnExceptionSamePassword_whenUserIdExist() {
        Users entity = mock(Users.class);
        ChangePassRequestDto request = mock(ChangePassRequestDto.class);
        when(userRepository.findById(request.getStaffCode())).thenReturn(Optional.of(entity));
        when(passwordEncoder.matches(request.getNewPassword(), entity.getPassword())).thenReturn(true);
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            userServiceImpl.changePassword(request);
        });
        assertThat(exception.getMessage()).isEqualTo("You entered an old password");
    }

    @DisplayName("change password throw not found when user not exist")
    @Test
    public void changePassword_shouldThrowsExceptionNotFound_whenNotFound() {
        ChangePassRequestDto requestDto = mock(ChangePassRequestDto.class);
        when(userRepository.findById(requestDto.getStaffCode())).thenReturn(Optional.empty());
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            userServiceImpl.changePassword(requestDto);
        });
        assertThat(exception.getMessage()).isEqualTo("user.not.found.with.staff.code:" + requestDto.getStaffCode());
    }

//	=================================#578 disable user===========================================

    @Test
    public void checkExistsAssignment_shouldReturnException_whenUserIdExist() {
        Users entity = mock(Users.class);
        when(userRepository.findById("SD001")).thenReturn(Optional.of(entity));
        when(assignmentRepository.existsByAssignedToOrAssignedBy(entity, entity)).thenReturn(true);
        Exception exception = assertThrows(DateInvalidException.class, () -> {
            userServiceImpl.checkExistsAssignment("SD001");
        });
        assertThat(exception.getMessage()).isEqualTo("exist.valid.assignments");
    }

    @Test
    public void checkExistsAssignment_shouldThrowsExceptionNotFound_whenUserIdNotExist() {
        when(userRepository.findById("SD001")).thenReturn(Optional.empty());
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            userServiceImpl.checkExistsAssignment("SD001");
        });
        assertThat(exception.getMessage()).isEqualTo("staff.not.found.with.code:SD001");
    }

    @Test
    public void disableStaff_shouldThrowsExceptionNotFound_whenUserIdNotExist() {
        when(userRepository.findById("SD001")).thenReturn(Optional.empty());
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            userServiceImpl.checkExistsAssignment("SD001");
        });
        assertThat(exception.getMessage()).isEqualTo("staff.not.found.with.code:SD001");
    }

    @Test
    public void disableStaff_shouldReturnResponseDto_whenUserIdExist() {

        Users entity = mock(Users.class);
        UserResponseDto expected = mock(UserResponseDto.class);

        when(userRepository.findById("SD001")).thenReturn(Optional.of(entity));
        when(userRepository.save(entity)).thenReturn(entity);
        when(modelMapper.map(entity, UserResponseDto.class)).thenReturn(expected);

        UserResponseDto actual = userServiceImpl.disableStaff("SD001");
        verify(entity).setState(UserState.INACTIVE);
        assertThat(actual).isEqualTo(expected);
    }

    public Sort defaultSorting(String sortBy, String sortDirection) {
        return sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
    }

}
