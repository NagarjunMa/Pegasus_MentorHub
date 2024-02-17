import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../pages/api/axios";
import { useSelector } from "react-redux";

const SIGNUP_URL = "/user";
const LOGIN_URL = "auth/local/signin";
const ARTICLE_URL = "/articles";
const ADD_MENTOR_URL = "user/addMentors";
const GET_MENTOR_SUGGESTION = "user/suggestedMentors";
const GET_INTEREST_URL = "/user/interests";
const USER_URL = "/user";
const FOLLOWED_MENTOR = "/user/mentors";
const GET_MENTOR_POSTS = "/articles";
const GET_MENTOR_AVAILABILITY = "/user/slotAvailability";
const LOGOUT_URL = "auth/logout";
const GET_MENTOR_AVAILABILITY_AND_POSTS = "/user/everything";

// export const updateAccessTokenAsync = createAsyncThunk(
//     'users/updateAccessToken',
//     async () => {
//         try {

//             const currentState = useSelector((state) => (state.users));
//             refresh_token = currentState.addUserResponse.refreshToken
//             const response = await axios.post('/auth/refresh', {
//                 headers : {
//                     'Authorization' : `Bearer ${refresh_token}`
//                 },
//                 withCredentails: true
//             });

//             const updateRefreshResponse = {
//                 accessToken : response.data.access_token,
//                 refreshToken : response.data.refresh_token,
//                 status : response.status
//             }

//             console.log("The response from /refresh call is " + JSON.stringify(response.data))
//             return (updateRefreshResponse)

//         } catch (err) {
//             console.log(err)
//         }

//     }

// );

export const patchMentorsFollowedAsync = createAsyncThunk(
  "users/patchMentorsFollowedAsync",
  async (payload) => {
    try {
      // const accessToken = payload.accessToken;
      const { accessToken, mentorIds } = payload;
      const resp = await axios.patch(
        USER_URL,
        { mentorIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentails: true,
        }
      );

      console.log("resp: patchMentorsFollowedAsync", resp);
      const patchMentorsFollowedResponse = {
        status: resp.status,
        userData: resp.data,
      };

      return patchMentorsFollowedResponse;
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUserAsync",
  async (payload) => {
    try {
      const resp = await axios.post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentails: true,
      });
      // console.log("The response from Login api is " + JSON.stringify(resp))
      const addUserResponse = {
        accessToken: resp.data.access_token,
        refreshToken: resp.data.refresh_token,
        status: resp.status,
        userData: resp.data.userData,
        // firstName : resp.data.userData.firstName
      };

      return addUserResponse;
    } catch (err) {
      console.log("err: ", err);
      return err.request.status;
    }
  }
);

export const userLogoutAsync = createAsyncThunk(
  "users/userLogoutAsync",
  async (payload) => {
    try {
      const accessToken = payload.accessToken;
      const resp = await axios.post(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentails: true,
      });
      return resp.status;
    } catch (err) { }
  }
);

export const getFollowedMentorAsync = createAsyncThunk(
  "users/getFollowedMentorAsync",
  async ({ currentState }) => {
    try {
      const access_token = currentState.addUserResponse.accessToken;
      const resp = await axios.get(FOLLOWED_MENTOR, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentails: true,
      });
      console.log("resp from : getFollowedMentorAsync", resp);
      const usersMentorData = {
        usersMentorData: resp.data,
      };
      return usersMentorData;
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

export const getMentorSuggestionsAsync = createAsyncThunk(
  "users/getMentorSuggestionsAsync",
  async ({ currentState }) => {
    try {
      const access_token = currentState.addUserResponse.accessToken;
      const resp = await axios.get(GET_MENTOR_SUGGESTION, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentails: true,
      });
      // console.log('resp from : getMentorSuggestions', resp);
      const allMentorData = {
        allMentors: resp.data,
      };
      // console.log('allMentorData in thunk: ', allMentorData);
      return allMentorData;
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

export const getMentorsByFilterAsync = createAsyncThunk(
  "users/getMentorsByFilterAsync",
  async (payload) => {
    console.log("payload in getMentorsByFilterAsync: ", payload);
    try {
      const accessToken = payload.accessToken;
      const params = payload.params;
      console.log("params: ", params);
      const resp = await axios.get(USER_URL, {
        params: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentails: true,
      });
      console.log("resp of getMentorsByFilterAsync: ", resp);
      const filteredMentorData = {
        filteredMentors: resp.data,
      };
      return filteredMentorData;
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

// export const filterData = createAsyncThunk(
//   "users/getMentorSuggestionsAsync",
//   async ({ currentState }) => {
//     try {
//       // console.log("Inside the try block of getMentorSuggestionsAsync")
//       // const currentState = useSelector((state) => (state.users));
//       // console.log('currentState in try : ', currentState);
//       // const access_token = currentState.addUserResponse.accessToken;
//       // console.log('access_token in slice: ', access_token);
//       const access_token = currentState.addUserResponse.accessToken;
//       const resp = await axios.get(GET_MENTOR_SUGGESTION, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//         withCredentails: true,
//       });
//       // console.log('resp from : getMentorSuggestions', resp);
//       const allMentorData = {
//         allMentors: resp.data,
//       };
//       // console.log('allMentorData in thunk: ', allMentorData);
//       return allMentorData;
//     } catch (err) {
//       console.log("err: ", err);
//     }
//   }
// );

export const addUserSignUpAsync = createAsyncThunk(
  "users/addUserSignUpAsync",
  async (payload) => {
    try {
      const resp = await axios.post(SIGNUP_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentails: true,
      });

      const addUserResponse = {
        accessToken: resp.data.access_token,
        refreshToken: resp.data.refresh_token,
        status: resp.status,
        userData: resp.data.userData,
      };

      return addUserResponse;
    } catch (err) {
      console.log("err: ", err.request.status);
      return err.request.status;
    }
  }
);

export const getUserAsync = createAsyncThunk("users/getUserAsync", async () => {
  console.log("In getUserAsync");
});

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (payload) => {
    const user = payload;
    return { user };
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (payload) => {
    const updateUserData = payload.data;
    try {
      let accessToken = payload.accessToken;
      const resp = await axios.patch(USER_URL, updateUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentails: true,
      });
      console.log("resp in updateUserAsync: ", resp);

      const updateUserResponse = {
        userData: resp.data,
      };

      return updateUserResponse;
    } catch (err) {
      console.log("err: ", err);
    }
  }
);

export const getInterestsAsync = createAsyncThunk(
  "users/getInterestsAsync",
  async () => {
    try {
      const resp = await axios.get(GET_INTEREST_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentails: true,
      });
      const getInterestsResponse = {
        interests: resp.data,
      };
      return getInterestsResponse;
    } catch (err) {}
  }
);

export const createPostAsync = createAsyncThunk(
  "users/createPostAsync",
  async (payload) => {
    try {
      const accessToken = payload.accessToken;
      const resp = await axios.post(ARTICLE_URL, payload.data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentails: true,
      });
      return resp.status;
    } catch (err) {}
  }
);

export const getMentorPostsAsync = createAsyncThunk(
  "users/getMentorPostsAsync",
  async ({ currentState }) => {
    try {
      const access_token = currentState.addUserResponse.accessToken;
      const resp = await axios.get(GET_MENTOR_POSTS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentails: true,
      });
      const getMentorPostsResponse = {
        posts: resp.data,
      };
      return getMentorPostsResponse;
    } catch (err) {}
  }
);

export const getMentorAvailability = createAsyncThunk(
  "users/getMentorAvailability",
  async ({ currentState }) => {
    try {
      const access_token = currentState.addUserResponse.accessToken;
      const resp = await axios.get(GET_MENTOR_AVAILABILITY, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentails: true,
      });
      const getMentorAvailabilityResponse = {
        availability: resp.data,
      };
      return getMentorAvailabilityResponse;
    } catch (err) {}
  }
);

export const getMentorAvailabilityAndPosts = createAsyncThunk(
  "users/getMentorAvailabilityAndPosts",
  async ({ currentState }) => {
    try {
      const access_token = currentState.addUserResponse.accessToken;
      const resp = await axios.get(GET_MENTOR_AVAILABILITY_AND_POSTS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentails: true,
      });
      console.log("resp: ", resp);
      const getMentorAvailabilityAndPostsResponse = {
        availability: resp.data.mentorAvailabilty,
        posts: resp.data.postsData,
      };
      return getMentorAvailabilityAndPostsResponse;
    } catch (err) {}
  }
);

export const todoSlice = createSlice({
  name: "users",
  initialState: {},

  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.push(user);
    },
  },
  extraReducers: {
    // [updateAccessToken.fulfilled]: (state, action) => {
    //     state.addTokens = action.payload
    // },
    [loginUserAsync.fulfilled]: (state, action) => {
      // console.log("The action is " + action);
      if (typeof action.payload === "object") {
        state.addUserResponse = action.payload;
      } else {
        state.errorCode = action.payload;
      }
      // console.log("The state is " + state)
    },
    [addUserSignUpAsync.fulfilled]: (state, action) => {
      // console.log('action: addUserSignUpAsync', action);
      if (typeof action.payload === "object") {
        state.addUserResponse = action.payload;
      } else {
        state.errorCode = action.payload;
      }
      // console.log("inside the addUserSignUpAsync", JSON.stringify(state.addUserResponse));
    },
    [getMentorSuggestionsAsync.fulfilled]: (state, action) => {
      state.addUserResponse.allMentorData = action.payload.allMentors;
      // console.log("inside the getMentorSuggestionsAsync", JSON.stringify(state.addUserResponse));
    },
    [getFollowedMentorAsync.fulfilled]: (state, action) => {
      state.addUserResponse.usersMentorData = action.payload.usersMentorData;
      // console.log("inside the getMentorSuggestionsAsync", JSON.stringify(state.addUserResponse));
    },
    [addUserAsync.fulfilled]: (state, action) => {
      state.push(action.payload.user);
    },
    [getUserAsync.fulfilled]: (state, action) => {
      return action.payload.users;
    },

    [getInterestsAsync.fulfilled]: (state, action) => {
      state.addUserResponse.interests = action.payload.interests;
      // return action.payload.interests;
    },

    [updateUserAsync.fulfilled]: (state, action) => {
      state.addUserResponse.userData = action.payload.userData;
      // return action.payload.interests;
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.addUserResponse.postStatus = action.payload;
    },
    [getMentorPostsAsync.fulfilled]: (state, action) => {
      state.addUserResponse.mentorPosts = action.payload.posts;
    },

    [getMentorAvailability.fulfilled]: (state, action) => {
      state.addUserResponse.mentorAvailability = action.payload.availability;
    },

    [getMentorAvailabilityAndPosts.fulfilled]: (state, action) => {
      state.addUserResponse.mentorAvailability = action.payload.availability;
      state.addUserResponse.mentorPosts = action.payload.posts;
    },

    [patchMentorsFollowedAsync.fulfilled]: (state, action) => {
      state.addUserResponse.userData = action.payload.userData;
      // return action.payload.interests;
    },
    [userLogoutAsync.fulfilled]: (state, action) => {
      state.addUserResponse = null;
    },
    [getMentorsByFilterAsync.fulfilled]: (state, action) => {
      state.addUserResponse.filteredMentors = action.payload.filteredMentors;
    },
  },
});

export const { addUser } = todoSlice.actions;

export default todoSlice.reducer;
