package com.nashtech.assetmanagement.utils;

import org.junit.jupiter.api.Test;

import static com.nashtech.assetmanagement.utils.AppConstants.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class StateConverterTest {

    @Test
    void getAssignmentState_ShouldReturnConvertedState_WhenGivenRawState() {
        //given
        String rawState1 = "waiting_for_acceptance";
        String rawState2 = "accepted";
        String rawState3 = "declined";
        String rawState4 = "lsgnegrj";

        //when
        String convertedState1 = StateConverter.getAssignmentState(rawState1);
        String convertedState2 = StateConverter.getAssignmentState(rawState2);
        String convertedState3 = StateConverter.getAssignmentState(rawState3);
        String convertedState4 = StateConverter.getAssignmentState(rawState4);

        //then
        assertThat(convertedState1).isEqualTo(WAITING_FOR_ACCEPTANCE);
        assertThat(convertedState2).isEqualTo(ACCEPTED);
        assertThat(convertedState3).isEqualTo(DECLINED);
        assertThat(convertedState4).isEqualTo(null);

    }

}