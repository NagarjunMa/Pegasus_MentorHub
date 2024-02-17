import { axiosCustom } from '../pages/api/axios'
import useRefreshToken from "./useRefreshToken"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const useAxiosCustom = () => {

    const currentState = useSelector((state) => (state.users))
    const refresh = useRefreshToken()

    useEffect ( () => {

        const requestIntercept = axiosCustom.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
            }
        )

        const responseIntercept = axiosCustom.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    console.log("The newAccessToken is " + newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosCustom(prevRequest)

                }
            }
        );

        return () => {
            axiosCustom.interceptors.response.eject(responseIntercept)
        }

    }, [currentState, refresh])



    return axiosCustom

}

export default useAxiosCustom
