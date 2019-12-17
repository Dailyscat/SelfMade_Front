const CHOOSE_CATEGORY = "home/CHOOSE_CATEGORY";

export const chooseCategory = (category) => {
  return {
    type: CHOOSE_CATEGORY
    choosedcategory: category
  }
}

const initialState = {
  choosedCategory: ""
}

export default function home (state = initialState, action) {
  switch(action.type) {
    case CHOOSE_CATEGORY:
      return {
        ...state,
        choosedCategory: action.choosedCategory
      }
    default:
      return state;
  }
}