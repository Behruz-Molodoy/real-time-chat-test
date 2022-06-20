const initialState = {
  isUser: false,
  name: null,
  imgUrl: '',
  uid: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return action.payload
    default:
      return state
  }
}

export default user
