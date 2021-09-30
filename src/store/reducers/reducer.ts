interface State {
  string: string;
}

interface Action {
  type: string;
}

const INITIAL_STATE: State = {
  string: "",
};

const reducer = (state: State = INITIAL_STATE, { type }: Action): State => {
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
