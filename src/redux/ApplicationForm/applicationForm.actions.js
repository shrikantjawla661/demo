import * as ApplicationTypes from "./applicationForm.types";
import axios from "axios";

// const baseUrl = "https://portal.cardinsider.com";
const baseUrl = "http://localhost:4000";

export const getDataApi = (inputData) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.GETDATALOADING,
  });
  try {
    let res = await axios.post(
      `${baseUrl}/api/axis/get-application-data`,
      inputData
    );
    console.log("-------", res);
    dispatch({
      type: ApplicationTypes.GETDATASUCCESS,
      payload: res.data.payload,
    });
    dispatch({
      type: ApplicationTypes.GETDATASUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ApplicationTypes.GETDATAERROR,
    });
  }
};

export const updateLastStep = (inputData) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${baseUrl}/api/axis/get-application-data`,
      inputData
    );
    console.log(res);
    if (res.data.message === "USER DOES NOT EXISTS") {
      dispatch({
        type: ApplicationTypes.UPDATELASTSTEP,
        payload: {
          lastStep: 0,
          newUserStatus: true,
        },
      });
    } else {
      dispatch({
        type: ApplicationTypes.UPDATELASTSTEP,
        payload: {
          newUserStatus: false,
          lastStep: +res.data.payload.aud_last_step,
        },
      });
    }
  } catch (error) {}
};

export const firstHit = (inputData) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.HITFIRSTLOADING,
  });
  try {
    let res = await axios.post(
      `${baseUrl}/api/axis/submit-credit-card-application`,
      inputData
    );

    console.log("resdf", res);

    // First handle error if there is any...
    if (!res.data.status) {
      console.log("error in firsthit...", res.data.message);
      return dispatch({
        type: ApplicationTypes.HITFIRSTERROR,
        payload: res.data.message,
      });
    }

    dispatch({
      type: ApplicationTypes.HITFIRSTSUCCESS,
    });
    let id;
    clearTimeout(id);
    id = setTimeout(() => {
      dispatch({
        type: ApplicationTypes.HITFIRSTSETSTATUS,
      });
    }, 800);
    dispatch(
      getDataApi({
        phoneNumber: "9998954053",
        step: +res.data.payload.current_step,
      })
    );
  } catch (error) {
    dispatch({
      type: ApplicationTypes.HITFIRSTERROR,
      payload: error?.message || "Something went wrong!",
    });
  }
};

export const secondHit = (inputData) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.HITSECONDLOADING,
  });
  try {
    let res = await axios.post(
      `${baseUrl}/api/axis/submit-credit-card-application`,
      inputData
    );
    console.log("resdf", res);

    //Handling error if there is any..
    if (!res.data.status) {
      console.log("error in secondHit...", res.data.message);
      return dispatch({
        type: ApplicationTypes.HITSECONDSERROR,
        payload: res.data.message,
      });
    }

    dispatch({
      type: ApplicationTypes.HITSECONDSUCCESS,
    });
    let id;
    clearTimeout(id);
    id = setTimeout(() => {
      dispatch({
        type: ApplicationTypes.HITSECONDSTATUSRESET,
      });
    }, 800);
    dispatch(
      getDataApi({
        phoneNumber: "9998954053",
        step: +res.data.payload.current_step,
      })
    );
  } catch (error) {
    dispatch({
      type: ApplicationTypes.HITSECONDSERROR,
      paylaod: error?.message || "Something went wrong!",
    });
  }
};

export const thirdHit = (inputData) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.HITTHIRDLOADING,
  });
  try {
    let res = await axios.post(
      `${baseUrl}/api/axis/submit-credit-card-application`,
      inputData
    );
    console.log("resdf", res);

    //handling error if there is any...
    if (!res.data.status) {
      console.log("error in thirdHit...", res.data.message);
      return dispatch({
        type: ApplicationTypes.HITTHIRDERROR,
        payload: res.data.message,
      });
    }

    dispatch({
      type: ApplicationTypes.HITTHIRDSUCCESS,
    });
    let id;
    clearTimeout(id);
    setTimeout(() => {
      dispatch({ type: ApplicationTypes.HITTHIRDSTATUSRESET });
    }, 800);
    dispatch(
      getDataApi({
        phoneNumber: "9998954053",
        step: +res.data.payload.current_step,
      })
    );
  } catch (error) {
    console.log(error, "errrrrrr");
    dispatch({
      type: ApplicationTypes.HITTHIRDERROR,
      payload: error?.message || "Something went wrong!",
    });
  }
};

export const fourthHit = (inputData, phone) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.HITFOURTHLOADING,
  });
  try {
    let savingDataToDBRes = await axios.post(
      `${baseUrl}/api/axis/submit-credit-card-application`,
      inputData
    );
    console.log("resdf", savingDataToDBRes);

    if (!savingDataToDBRes.data.status) {
      console.log("error in fourthHit...", savingDataToDBRes.data.message);
      return dispatch({
        type: ApplicationTypes.HITFOURTHERROR,
        payload: savingDataToDBRes.data.message,
      });
    }

    const sendOtpRes = await axios.post(
      `https://portal.cardinsider.com/api/axis/generate-axis-bank-otp`,
      { phoneNumber: phone }
    );
    console.log(">>>>>>>>>>>>", sendOtpRes);

    // Handling the errors if there is any...
    if (!sendOtpRes.data.status) {
      console.log("error in fourthHit...", sendOtpRes.data.message);
      return dispatch({
        type: ApplicationTypes.HITFOURTHERROR,
        payload: sendOtpRes.data.message,
      });
    }

    dispatch({
      type: ApplicationTypes.HITFOURTHSUCCESS,
      payload: sendOtpRes.data.payload.data.tokenReferenceId,
    });
    let id;
    clearTimeout(id);
    setTimeout(() => {
      dispatch({ type: ApplicationTypes.HITFOURTHSTATUSRESET });
    }, 800);

    await dispatch(
      getDataApi({
        phoneNumber: "9998954053",
        step: +savingDataToDBRes.data.payload.current_step,
      })
    );
  } catch (error) {
    dispatch({
      type: ApplicationTypes.HITFOURTHERROR,
      payload: error?.message || "Something went wrong!",
    });
  }
};

export const fetchDistrict = (pin) => async (dispatch) => {
  try {
    let res = await axios.post(`${baseUrl}/api/common/get-pincode-data`, {
      pincode: pin,
    });
    console.log("resdf", res.data);

    dispatch({
      type: ApplicationTypes.FETCHDISTRICT,
      payload: {
        district: res.data.payload[0].district,
        city: res.data.payload[0].state,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistrict2 = (pin) => async (dispatch) => {
  // console.log(pin);
  try {
    let res = await axios.post(`${baseUrl}/api/common/get-pincode-data`, {
      pincode: pin,
    });
    console.log("resdf", res.data);
    dispatch({
      type: ApplicationTypes.FETCHDISTRICT2,
      payload: {
        district: res.data.payload[0].district,
        city: res.data.payload[0].state,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const finalAppSubmitReq = (otp, token, phone) => async (dispatch) => {
  dispatch({
    type: ApplicationTypes.FINALREQLODING,
  });
  try {
    const res = await axios.post(
      `${baseUrl}/api/axis/send-application-axis-bank`,
      {
        phoneNumber: phone,
        otp,
        token,
      }
    );
    console.log(res);
    console.log("verifying otp", res);
    if (!res.data.status) {
      dispatch({
        type: ApplicationTypes.FINALREQERROR,
        payload: res.data.message,
      });
    }
    if (res.data.status) {
      await dispatch({
        type: ApplicationTypes.FINALREQSUCCESS,
      });
    }
    let id;
    timeOutToResetStatus(id, ApplicationTypes.FINALREQSTATUSRESET, dispatch);
  } catch (error) {
    console.log(
      "🚀 ~ file: applicationForm.actions.js:295 ~ sendOtp ~ error:",
      error
    );
    console.log(error);
    dispatch({
      type: ApplicationTypes.FINALREQERROR,
      payload: error.message,
    });
    let id;
    timeOutToResetStatus(id, ApplicationTypes.FINALREQSTATUSRESET, dispatch);
  }
};

function timeOutToResetStatus(id, resetReducerType, dispatch) {
  clearTimeout(id);
  id = setTimeout(() => {
    dispatch({
      type: resetReducerType,
    });
  }, 800);
}
