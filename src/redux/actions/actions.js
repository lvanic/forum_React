export function setPage(page){
    return{
        type: "SET_PAGE",
        payload: page
    }
}
export function setTopic(topic){
    return{
        type: "SET_TOPIC",
        payload: topic
    }
}
export function setLanguage(language){
    return{
        type: "SET_LANGUAGE",
        payload: language
    }
}
export function signUp(login) {
    return {
      type: "SIGN_UP",
      login: login
    };
  }
  export function signedIn(state) {
    return {
      type: "SIGNED_IN",
      in: state
    }
  }