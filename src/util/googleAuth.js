import { useGoogleLogin, useGoogleLogout } from 'react-google-login'

const clientId = '738664611187-0ja07h2b9slhmbgf9reqf1h4tslrvmsm.apps.googleusercontent.com'

export const useLogin = (onSuccess = response => { }, onFailure = response => { }) => {
    const { signIn } = useGoogleLogin({
        clientId,
        onSuccess,
        onFailure,
        isSignedIn: true,
        accessType: 'offline',
    })

    return signIn
}

export const useLogout = (onSuccess = response => { }, onFailure = response => { }) => {
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess: onSuccess,
        onFailure,
    })

    return signOut
}