package com.nashtech.assetmanagement.service.impl;


import com.nashtech.assetmanagement.dto.request.AssignmentRequestDto;
import com.nashtech.assetmanagement.dto.request.ChangeAssignmentStateRequestDto;
import com.nashtech.assetmanagement.dto.response.AssignmentResponseDto;
import com.nashtech.assetmanagement.dto.response.MessageResponse;
import com.nashtech.assetmanagement.entities.Asset;
import com.nashtech.assetmanagement.entities.Assignment;
import com.nashtech.assetmanagement.entities.AssignmentId;
import com.nashtech.assetmanagement.entities.Users;
import com.nashtech.assetmanagement.enums.AssetState;
import com.nashtech.assetmanagement.exception.DateInvalidException;
import com.nashtech.assetmanagement.exception.NotUniqueException;
import com.nashtech.assetmanagement.exception.ResourceNotFoundException;
import com.nashtech.assetmanagement.mapper.AssignmentContent;
import com.nashtech.assetmanagement.mapper.AssignmentMapper;
import com.nashtech.assetmanagement.repositories.AssetRepository;
import com.nashtech.assetmanagement.repositories.AssignmentRepository;
import com.nashtech.assetmanagement.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class AssignmentServiceImplTest {

    AssignmentRepository assignmentRepository;
    AssignmentContent assignmentContent;
    UserRepository userRepository;
    AssetRepository assetRepository;
    AssignmentMapper assignmentMapper;
    AssignmentServiceImpl assignmentServiceImpl;
    List<String> states;


    @BeforeEach
    void setUp() {
        assignmentRepository = mock(AssignmentRepository.class);
        assignmentContent = mock(AssignmentContent.class);
        userRepository = mock(UserRepository.class);
        assetRepository = mock(AssetRepository.class);
        assignmentMapper = mock(AssignmentMapper.class);
        assignmentServiceImpl = new AssignmentServiceImpl(assignmentRepository, assignmentContent, userRepository,
                assetRepository, assignmentMapper);

    }

    @DisplayName("When all parameters of the request are valid then return ListAssignmentResponseDto - positive case")
    @Test
    void getAssignmentsByCondition_ShouldReturnListAssignmentResponseDto_WhenAllParametersIsValid() {
        // given
        int pageNo = 0;
        int pageSize = 1;
        String text = "SD0001";
        String assignedDate = "2022-02-02";
        states = List.of("accepted", "declined");

        var textCaptor = ArgumentCaptor.forClass(String.class);
        var listCaptor = ArgumentCaptor.forClass(List.class);
        var pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        var dateCaptor = ArgumentCaptor.forClass(Date.class);
        var pageCaptor = ArgumentCaptor.forClass(Page.class);

        //when
        assignmentServiceImpl.getAssignmentsByCondition(pageNo, pageSize, text, states, assignedDate);
        //then
        verify(assignmentRepository).getAssignmentByConditions(
                textCaptor.capture(),
                listCaptor.capture(),
                dateCaptor.capture(),
                pageableCaptor.capture());

        assertThat(textCaptor.getValue()).isEqualTo(text.toLowerCase());
        assertThat(listCaptor.getValue()).isEqualTo(List.of("Accepted", "Declined"));
        assertThat(dateCaptor.getValue()).isEqualTo(Date.valueOf(assignedDate));
        assertThat(pageableCaptor.getValue()).isEqualTo(PageRequest.of(pageNo, pageSize));

        verify(assignmentContent).getAssignmentResponse(pageCaptor.capture());
        assertThat(pageCaptor.getValue()).isEqualTo(assignmentRepository.getAssignmentByConditions(
                textCaptor.capture(),
                listCaptor.capture(),
                dateCaptor.capture(),
                pageableCaptor.capture()));
    }

    @DisplayName("When the date string of the request is blank then get assignments without assigned date")
    @Test
    void getAssignmentsByCondition_ShouldReturnListAssignmentResponseDto_WhenDateStringIsBlank() {
        //given
        int pageNo = 0;
        int pageSize = 1;
        String text = "SD0001";
        String assignedDate = "";
        states = List.of("accepted", "declined");

        var textCaptor = ArgumentCaptor.forClass(String.class);
        var listCaptor = ArgumentCaptor.forClass(List.class);
        var pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        var pageCaptor = ArgumentCaptor.forClass(Page.class);

        //when
        assignmentServiceImpl.getAssignmentsByCondition(pageNo, pageSize, text, states, assignedDate);

        //then
        verify(assignmentRepository)
                .getAssignmentWithoutAssignedDate(textCaptor.capture(), listCaptor.capture(), pageableCaptor.capture());

        assertThat(textCaptor.getValue()).isEqualTo(text.toLowerCase());
        assertThat(listCaptor.getValue()).isEqualTo(List.of("Accepted", "Declined"));
        assertThat(pageableCaptor.getValue()).isEqualTo(PageRequest.of(pageNo, pageSize));

        verify(assignmentContent).getAssignmentResponse(pageCaptor.capture());
        assertThat(pageCaptor.getValue()).isEqualTo(assignmentRepository.getAssignmentWithoutAssignedDate(
                textCaptor.getValue(),
                listCaptor.getValue(),
                pageableCaptor.getValue()));
    }

    @Test
    void getAssignmentsByCondition_ShouldThrowsException_whenTheDateFormatIsInvalid() {
        // given
        int pageNo = 0;
        int pageSize = 1;
        String text = "SD0001";
        String assignedDateStr = "abc-123";
        states = List.of("accepted", "declined");

        // when
        DateInvalidException exception = assertThrows(DateInvalidException.class,
                () -> assignmentServiceImpl.getAssignmentsByCondition(
                        pageNo, pageSize, text, states,  assignedDateStr));

        //then
        assertThat(exception.getMessage()).isEqualTo("Date.format.is.not.valid");

    }


    // US584 Create New Assignment
    @Test
    void createNewAssignment_ShouldReturnResponseAssignmentDto_WhenRequestValid() {
        AssignmentRequestDto request = mock(AssignmentRequestDto.class);
        when(request.getAssignedTo()).thenReturn("assignTo");
        when(request.getAssignedBy()).thenReturn("assignBy");
        when(request.getAssetCode()).thenReturn("assetCode");
        Asset asset = mock(Asset.class);
        Users assignBy = mock(Users.class);
        Users assignTo = mock(Users.class);
        Assignment assignment = mock(Assignment.class);
        AssignmentResponseDto response = mock(AssignmentResponseDto.class);
        when(assetRepository.findById("assetCode")).thenReturn(Optional.of(asset));
        when(userRepository.findById("assignBy")).thenReturn(Optional.of(assignBy));
        when(userRepository.findById("assignTo")).thenReturn(Optional.of(assignTo));
        when(assignmentMapper.MapRequestAssignmentToAssignment(request)).thenReturn(assignment);
        when(assignmentMapper.MapAssignmentToResponseDto(assignment)).thenReturn(response);
        AssignmentResponseDto result = assignmentServiceImpl.createNewAssignment(request);
        verify(asset).setState(AssetState.ASSIGNED);
        verify(assignment).setAssignedTo(assignTo);
        verify(assignment).setAssignedBy(assignBy);
        verify(assignment).setAsset(asset);
        verify(assignmentRepository).save(assignment);
        assertThat(result).isEqualTo(response);
    }

    @Test
    void createNewAssignment_ShouldThrowResourceNotFoundEx_WhenAssetCodeNotExist() {
        Asset asset = mock(Asset.class);
        AssignmentRequestDto request = mock(AssignmentRequestDto.class);
        when(assetRepository.findById("assetCode")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> assignmentServiceImpl.createNewAssignment(request));
        assertThat(e.getMessage()).isEqualTo("AssetCode not found");
    }

    @Test
    void createNewAssignment_ShouldThrowResourceNotFoundEx_WhenUserAssignToNotExist() {
        Asset asset = mock(Asset.class);
        AssignmentRequestDto request = mock(AssignmentRequestDto.class);
        when(request.getAssetCode()).thenReturn("assetCode");
        when(request.getAssignedTo()).thenReturn("assignTo");
        when(assetRepository.findById("assetCode")).thenReturn(Optional.of(asset));
        when(userRepository.findById("assignTo")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> assignmentServiceImpl.createNewAssignment(request));
        assertThat(e.getMessage()).isEqualTo("Assign to User not found");
    }

    @Test
    void createNewAssignment_ShouldThrowResourceNotFoundEx_WhenUserAssignByNotExist() {
        Asset asset = mock(Asset.class);
        Users assignTo = mock(Users.class);
        AssignmentRequestDto request = mock(AssignmentRequestDto.class);
        when(request.getAssetCode()).thenReturn("assetCode");
        when(request.getAssignedTo()).thenReturn("assignTo");
        when(request.getAssignedBy()).thenReturn("assignBy");
        when(assetRepository.findById("assetCode")).thenReturn(Optional.of(asset));
        when(userRepository.findById("assignTo")).thenReturn(Optional.of(assignTo));
        when(userRepository.findById("assignBy")).thenReturn(Optional.empty());
        ResourceNotFoundException e = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> assignmentServiceImpl.createNewAssignment(request));
        assertThat(e.getMessage()).isEqualTo("Assign by User not found");
    }

    @Test
    void createNewAssignment_ShouldThrowNotUniqueEx_WhenRequestSameId() {
        AssignmentRequestDto request = mock(AssignmentRequestDto.class);
        Date date = mock(Date.class);
        when(request.getAssignedTo()).thenReturn("assignTo");
        when(request.getAssignedDate()).thenReturn(date);
        when(request.getAssetCode()).thenReturn("assetCode");
        when(assignmentRepository.existsById_AssetCodeAndId_AssignedDateAndId_AssignedTo
                ("assetCode", date, "assignTo")).thenReturn(true);
        NotUniqueException e = Assertions.assertThrows(NotUniqueException.class,
                () -> assignmentServiceImpl.createNewAssignment(request));
        assertThat(e.getMessage()).isEqualTo("AssignmentId.is.exist");
    }

    @Test
    void getListAssignmentByAsset_ShouldReturnListAssignmentDto_WhenAssetIdExist() {
        Asset entity = mock(Asset.class);
        List<Assignment> listEntity = mock(List.class);
        List<AssignmentResponseDto> expected = mock(List.class);
        when(assetRepository.findById("Laptop001")).thenReturn(Optional.of(entity));
        when(assignmentRepository.findByAsset(entity)).thenReturn(listEntity);
        when(assignmentMapper.mapperListAssignment(listEntity)).thenReturn(expected);

        List<AssignmentResponseDto> actual = assignmentServiceImpl.getListAssignmentByAssetCode("Laptop001");
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getListAssignmentByAsset_ShouldReturnListAssignmentDto_WhenAssetIdNotExist() {
        when(assetRepository.findById("Laptop001")).thenReturn(Optional.empty());
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            assignmentServiceImpl.getListAssignmentByAssetCode("Laptop001");
        });
        assertThat(exception.getMessage()).isEqualTo("asset.not.found.with.code:Laptop001");
    }

    @Test
    void getListAssignmentByUser_whenThrowResourceNotFound_whenUserIdNotExist() {
        Users user = mock(Users.class);
        when(userRepository.findById("SD001")).thenReturn(Optional.empty());
        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            assignmentServiceImpl.getListAssignmentByUser("SD001", "code", "ASC");
        });
        assertThat(exception.getMessage()).isEqualTo("user.not.found.with.code:SD001");
    }

	@Test
	void getListAssignmentByUser_whenReturnListAssignmentDto_whenUserIdExist() {
        Users user = mock(Users.class);
        Page<Assignment> pageAssignment = mock(Page.class);
        List<Assignment> listAssignment = mock(List.class);
        List<AssignmentResponseDto> expectList = mock(List.class);

        when(userRepository.findById("SD001")).thenReturn(Optional.of(user));
        when(assignmentRepository.getListAssignmentByUser(eq("SD001"), Mockito.any(Pageable.class))).thenReturn(pageAssignment);
        when(pageAssignment.getContent()).thenReturn(listAssignment);
        when(assignmentMapper.mapperListAssignment(listAssignment)).thenReturn(expectList);


        List<AssignmentResponseDto> actual = assignmentServiceImpl.getListAssignmentByUser("SD001", "code", "ASC");

        ArgumentCaptor<Pageable> captor = ArgumentCaptor.forClass(Pageable.class);
        verify(assignmentRepository).getListAssignmentByUser(eq("SD001"), captor.capture());
        Pageable pageable = captor.getValue();

        assertThat(pageable.getPageSize()).isEqualTo(20);
        assertThat(pageable.getPageNumber()).isEqualTo(0);
        assertThat(pageable.getSort().ascending()).isEqualTo(Sort.by("code"));
        assertThat(actual).isEqualTo(expectList);
	}

	//589 - Respond to his/her own assignment
	@DisplayName("Given invalid state when update assignments status then return message response - negative case")
	@Test
	void updateAssignmentStatus_ShouldReturnMessageResponse_WhenStateInvalid() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);

		when(changeAssignmentStateRequestDto.getState()).thenReturn("Waiting for acceptance");
		MessageResponse messageResponse = assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto);

		assertThat(messageResponse.getMessage()).isEqualTo("Assignment state request is not valid");
	}

    @DisplayName("Given invalid assignedTo when update assignments status then return exception - negative case")
    @Test
    void updateAssignmentStatus_ShouldReturnResourceNotFoundException_WhenAssignedToInvalid() {
        ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);

        when(changeAssignmentStateRequestDto.getState()).thenReturn("Accepted");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.empty());
        ResourceNotFoundException exception = Assertions.assertThrows(ResourceNotFoundException.class,
                () -> assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto));

        assertThat(exception.getMessage())
                .isEqualTo("Cannot find user with username: " + changeAssignmentStateRequestDto.getAssignedTo());
    }

	@DisplayName("Given invalid assignment id when update assignments status then return exception - negative case")
	@Test
	void updateAssignmentStatus_ShouldReturnResourceNotFoundException_WhenAssignmentIdInvalid() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);
        Users users = mock(Users.class);

		when(changeAssignmentStateRequestDto.getState()).thenReturn("Accepted");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.of(users));
		ArgumentCaptor<AssignmentId> assignmentIdArgumentCaptor = ArgumentCaptor.forClass(AssignmentId.class);
		when(assignmentRepository.findById(assignmentIdArgumentCaptor.capture())).thenReturn(Optional.empty());

		ResourceNotFoundException exception = Assertions.assertThrows(ResourceNotFoundException.class,
				() -> assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto));

		assertThat(exception.getMessage())
				.isEqualTo("Cannot find assignment with assignment id: " + assignmentIdArgumentCaptor.getValue());
	}

	@DisplayName("Given assignment state in database is not Waiting for acceptance when update assignments status then return message response - negative case")
	@Test
	void updateAssignmentStatus_ShouldReturnMessageResponse_WhenAssignmentStateInDatabaseIsNotWaitingForAcceptance() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);
		Assignment assignment = mock(Assignment.class);
        Users users = mock(Users.class);

        when(changeAssignmentStateRequestDto.getState()).thenReturn("Accepted");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.of(users));
        ArgumentCaptor<AssignmentId> assignmentIdArgumentCaptor = ArgumentCaptor.forClass(AssignmentId.class);
		when(assignmentRepository.findById(assignmentIdArgumentCaptor.capture())).thenReturn(Optional.of(assignment));
		when(assignment.getState()).thenReturn("Accepted");

		MessageResponse messageResponse = assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto);

		assertThat(messageResponse.getMessage()).isEqualTo("Assignment state in database is Accepted or Declined");
	}

	@DisplayName("Given request assignment state is Declined and asset code invalid when update assignments status then return exception - negative case")
	@Test
	void updateAssignmentStatus_ShouldReturnResourceNotFoundException_WhenRequestAssignmentStateIsDeclinedAndAssetCodeInvalid() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);
		Assignment assignment = mock(Assignment.class);
        Users users = mock(Users.class);

        when(changeAssignmentStateRequestDto.getState()).thenReturn("Declined");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.of(users));
        ArgumentCaptor<AssignmentId> assignmentIdArgumentCaptor = ArgumentCaptor.forClass(AssignmentId.class);
		when(assignmentRepository.findById(assignmentIdArgumentCaptor.capture())).thenReturn(Optional.of(assignment));
		when(assignment.getState()).thenReturn("Waiting for acceptance");
		when(assetRepository.findById(changeAssignmentStateRequestDto.getAssetCode())).thenReturn(Optional.empty());
		ResourceNotFoundException exception = Assertions.assertThrows(ResourceNotFoundException.class,
				() -> assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto));

		assertThat(exception.getMessage()).isEqualTo("Cannot find asset with asset code: " + changeAssignmentStateRequestDto.getAssetCode());
	}

	@DisplayName("Given request assignment state is Declined and changeAssignmentStateRequestDto valid when update assignments status then return message response - positive case")
	@Test
	void updateAssignmentStatus_ShouldReturnMessageResponse_WhenRequestAssignmentStateIsDeclinedAndChangeAssignmentStateRequestDtoValid() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);
		Assignment assignment = mock(Assignment.class);
		Asset asset = mock(Asset.class);
        Users users = mock(Users.class);

		when(changeAssignmentStateRequestDto.getState()).thenReturn("Declined");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.of(users));
        ArgumentCaptor<AssignmentId> assignmentIdArgumentCaptor = ArgumentCaptor.forClass(AssignmentId.class);
		when(assignmentRepository.findById(assignmentIdArgumentCaptor.capture())).thenReturn(Optional.of(assignment));
		when(assignment.getState()).thenReturn("Waiting for acceptance");
		when(assetRepository.findById(changeAssignmentStateRequestDto.getAssetCode())).thenReturn(Optional.of(asset));

		MessageResponse messageResponse = assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto);
		verify(asset).setState(AssetState.AVAILABLE);
		verify(assetRepository).save(asset);
		verify(assignment).setState("Declined");
		verify(assignmentRepository).save(assignment);

		assertThat(messageResponse.getMessage()).isEqualTo("Update assignment state to Declined successfully!");
	}

	@DisplayName("Given request assignment state is Accepted and changeAssignmentStateRequestDto valid when update assignments status then return message response - positive case")
	@Test
	void updateAssignmentStatus_ShouldReturnMessageResponse_WhenRequestAssignmentStateIsAcceptedAndChangeAssignmentStateRequestDtoValid() {
		ChangeAssignmentStateRequestDto changeAssignmentStateRequestDto = mock(ChangeAssignmentStateRequestDto.class);
		Assignment assignment = mock(Assignment.class);
        Users users = mock(Users.class);

		when(changeAssignmentStateRequestDto.getState()).thenReturn("Accepted");
        when(userRepository.findByUserName(changeAssignmentStateRequestDto.getAssignedTo())).thenReturn(Optional.of(users));
		ArgumentCaptor<AssignmentId> assignmentIdArgumentCaptor = ArgumentCaptor.forClass(AssignmentId.class);
		when(assignmentRepository.findById(assignmentIdArgumentCaptor.capture())).thenReturn(Optional.of(assignment));
		when(assignment.getState()).thenReturn("Waiting for acceptance");

		MessageResponse messageResponse = assignmentServiceImpl.updateAssignmentState(changeAssignmentStateRequestDto);
		verify(assignment).setState("Accepted");
		verify(assignmentRepository).save(assignment);

		assertThat(messageResponse.getMessage()).isEqualTo("Update assignment state to Accepted successfully!");
	}
}