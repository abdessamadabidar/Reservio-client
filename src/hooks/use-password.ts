import {useEffect, useState} from "react";


export const usePassword = () => {

	const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
	const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false);

	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');


	const togglePasswordVisibility = () => setPasswordVisibility(!passwordVisibility);
	const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisibility(!confirmPasswordVisibility);

	const [passwordMatches, setPasswordMatches] = useState<boolean>(true);

	useEffect(() => {

		setPasswordMatches(password === confirmPassword)
	}, [confirmPassword])

	return {setPassword, setConfirmPassword, togglePasswordVisibility, toggleConfirmPasswordVisibility, passwordVisibility, confirmPasswordVisibility, passwordMatches}

}