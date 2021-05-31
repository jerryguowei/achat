import { connect } from "react-redux";
import UserRequestList from "../../components/UserRequestList";
import { ReduxState } from "../../Model/StateModel";


function mapStateToProps(state: ReduxState) {
    return {
        userRequests : state.userRequests
    }
}

export default connect(mapStateToProps)(UserRequestList);