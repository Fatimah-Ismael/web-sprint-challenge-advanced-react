import React from "react";

class SubmitEmail extends React.Component {
    render() {
        return (<form>
            <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>);
    }
}

export default SubmitEmail;