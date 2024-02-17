import axios from '../pages/api/axios';
import { useSelector, useDispatch } from "react-redux";
import { updateAccessTokenAsync } from '../redux/userSlice';

const useRefreshToken = () => {
    const currentState = useSelector((state) => (state.users))
    const dispatch = useDispatch()

    console.log("The access_token in previous state is" + currentState)

    const refresh = async () => {
        dispatch(
            updateAccessTokenAsync()
        );

        return currentState.addUserResponse.accessToken

        // console.log("The updated access_token is  " + response.data.access_token)
    }
 
}

export default useRefreshToken