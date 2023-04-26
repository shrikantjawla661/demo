import * as ApplicationTypes from "./applicationForm.types";

export const authInitalState = {
  hitFirstLoading: false,
  hitFirstError: false,
  hitFirstSuccess: false,
  hitFirstStatus: false,
  hitFirstErrorMessage: "",
  //
  hitSecondLoading: false,
  hitSecondError: false,
  hitSecondSuccess: false,
  hitSecondStatus: false,
  hitSecondErrorMessage: "",
  //
  hitThirdLoading: false,
  hitThirdError: false,
  hitThirdSuccess: false,
  hitThirdStatus: false,
  hitThirdErrorMessage: "",
  //
  hitFourthLoading: false,
  hitFourthError: false,
  hitFourthSuccess: false,
  hiFourthStatus: false,
  hitFourthErrorMessage: "",
  otpToken: "",
  //
  getDataLoading: false,
  getDataError: false,
  getDataSuccess: false,
  //
  districtData: {
    district: "",
    state: "",
  },
  districtData2: {
    district: "",
    state: "",
  },
  userInfo: {
    lastStep: 0,
    newUserStatus: false,
  },
  data: {},
  //
  finalReqLoading: false,
  finalReqError: false,
  finalReqSuccess: false,
  finalReqStatus: false,
  finalReqErrorMessage: "",
};

export const applicationFromReducer = (
  state = authInitalState,
  { type, payload }
) => {
  switch (type) {
    //First hit related cases
    case ApplicationTypes.HITFIRSTLOADING: {
      return {
        ...state,
        hitFirstLoading: true,
        hitFirstError: false,
      };
    }
    case ApplicationTypes.HITFIRSTERROR: {
      return {
        ...state,
        hitFirstError: true,
        hitFirstLoading: false,
        hitFirstErrorMessage: payload,
      };
    }
    case ApplicationTypes.HITFIRSTSUCCESS: {
      return {
        ...state,
        // hitFirstStatus: payload.hitFirstStatus,
        hitFirstStatus: true,
        hitFirstSuccess: true,
        hitFirstLoading: false,
        hitFirstError: false,
      };
    }

    case ApplicationTypes.HITFIRSTSETSTATUS: {
      return {
        ...state,
        hitFirstStatus: false,
      };
    }

    //SECOND hit related cases
    case ApplicationTypes.HITSECONDLOADING: {
      return {
        ...state,
        hitSecondLoading: true,
        hitSecondError: false,
      };
    }
    case ApplicationTypes.HITSECONDSERROR: {
      return {
        ...state,
        hitSecondError: true,
        hitSecondLoading: false,
        hitSecondErrorMessage: payload,
      };
    }
    case ApplicationTypes.HITSECONDSUCCESS: {
      return {
        ...state,
        hitSecondSuccess: true,
        hitSecondStatus: true,
        hitSecondLoading: false,
        hitSecondError: false,
      };
    }
    case ApplicationTypes.HITSECONDSTATUSRESET: {
      return {
        ...state,
        hitSecondStatus: false,
      };
    }

    //Get district related cases
    case ApplicationTypes.FETCHDISTRICT: {
      return {
        ...state,
        districtData: {
          ...state.districtData,
          district: payload.district,
          city: payload.city,
        },
      };
    }
    case ApplicationTypes.FETCHDISTRICT2: {
      return {
        ...state,
        districtData2: {
          ...state.districtData2,
          district: payload.district,
          city: payload.city,
        },
      };
    }

    // Third related cases
    case ApplicationTypes.HITTHIRDLOADING: {
      return {
        ...state,
        hitThirdLoading: true,
      };
    }
    case ApplicationTypes.HITTHIRDSUCCESS: {
      return {
        ...state,
        hitThirdSuccess: true,
        hitThirdStatus: true,
        hitThirdError: false,
        hitThirdLoading: false,
      };
    }
    case ApplicationTypes.HITTHIRDERROR: {
      return {
        ...state,
        hitThirdError: true,
        hitThirdErrorMessage: payload,
        hitThirdLoading: false,
      };
    }

    case ApplicationTypes.HITTHIRDSTATUSRESET: {
      return {
        ...state,
        hitThirdStatus: false,
      };
    }

    // Fourth related cases
    case ApplicationTypes.HITFOURTHLOADING: {
      return {
        ...state,
        hitFourthLoading: true,
      };
    }
    case ApplicationTypes.HITFOURTHSUCCESS: {
      return {
        ...state,
        hitFourthSuccess: true,
        hiFourthStatus: true,
        hitFourthError: false,
        hitFourthLoading: false,
        otpToken: payload,
      };
    }
    case ApplicationTypes.HITFOURTHERROR: {
      return {
        ...state,
        hitFourthError: true,
        hitFourthErrorMessage: payload,
        hitFourthLoading: false,
      };
    }
    case ApplicationTypes.HITFOURTHSTATUSRESET: {
      return {
        ...state,
        hiFourthStatus: false,
      };
    }

    // update LAST STEP OF USER related cases

    case ApplicationTypes.UPDATELASTSTEP: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          lastStep: payload.lastStep,
          newUserStatus: payload.newUserStatus,
        },
      };
    }

    //Get data related cases

    case ApplicationTypes.GETDATALOADING: {
      return {
        ...state,
        getDataLoading: true,
      };
    }
    case ApplicationTypes.GETDATAERROR: {
      return {
        ...state,
        getDataError: true,
        getDataLoading: false,
      };
    }
    case ApplicationTypes.GETDATASUCCESS: {
      // console.log('>>>>>>>>>',payload)
      return {
        ...state,
        data: payload.payload,
        getDataSuccess: true,
        getDataError: false,
        getDataLoading: false,
      };
    }

    // send otp related cases
    //----------------------
    case ApplicationTypes.FINALREQLODING: {
      return {
        ...state,
        finalReqLoading: true,
      };
    }
    case ApplicationTypes.FINALREQERROR: {
      return {
        ...state,
        finalReqError: true,
        finalReqLoading: false,
        finalReqErrorMessage: payload,
      };
    }
    case ApplicationTypes.FINALREQSUCCESS: {
      return {
        ...state,
        finalReqError: false,
        finalReqLoading: false,
        finalReqStatus: true,
        finalReqSuccess: true,
      };
    }
    case ApplicationTypes.FINALREQSTATUSRESET: {
      return {
        ...state,
        finalReqStatus: false,
        finalReqError: false,
        otpToken: "",
        finalReqErrorMessage: "",
      };
    }
    default: {
      return state;
    }
  }
};
