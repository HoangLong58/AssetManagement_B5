package com.nashtech.assetmanagement.service;

import com.nashtech.assetmanagement.dto.request.ChangePassRequestDto;
import com.nashtech.assetmanagement.dto.request.LoginRequestDto;
import com.nashtech.assetmanagement.dto.request.UserRequestDto;
import com.nashtech.assetmanagement.dto.response.*;
import com.nashtech.assetmanagement.sercurity.userdetail.UserPrinciple;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {

    boolean isUsernameExist(String username);


    SignInResponseDto signIn(LoginRequestDto requestLoginDTO);

    UserContentResponseDto createNewUser(UserRequestDto user);

    UserContentResponseDto editUser(UserRequestDto user, String staffCode);

    LocationResponseDto getLocationByStaffCode(String staffCode);

    List<UserContentResponseDto> getUsersByStaffCodeOrNameAndLocationCode(String text, String locationCode);

    UserPrinciple loadUserByUsername(String userName)
            throws UsernameNotFoundException;


    //filter + searching
    ListUsersResponseDto getAllUsersBySearchingStaffCodeOrNameOrRole(int pageNo,
                                                                     int pageSize,
                                                                     String sortBy,
                                                                     String sortDirection,
                                                                     String searchText,
                                                                     List<String> roles);


    SingleUserResponseDto getUserDetailInfo(String staffCode);

    MessageResponse changePasswordFirstLogin(String userName, String newPassword);

    UserResponseDto changePassword(ChangePassRequestDto dto);

    void checkExistsAssignment(String staffCode);

    UserResponseDto disableStaff(String staffCode);

}
