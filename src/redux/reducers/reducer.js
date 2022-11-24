import { language } from "../../settings/language";
const initialState = {
    theme: "",
    language: language[0],
    page: 1,
    activeTopic: 'none',
    login: '',
    signedIn: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);
        case "SET_PAGE":
            return { ...state, page: action.payload };
        case "SET_LANGUAGE":
            return { ...state, language: action.payload };
        case "SIGN_UP":
            return { ...state, login: action.login }
        case "SIGNED_IN":
            return { ...state, signedIn: action.in }
        case "SET_TOPIC":
            return { ...state, activeTopic: action.payload }
        default:
            return state;
    }
}