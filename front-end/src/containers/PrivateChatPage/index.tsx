import { connect } from "react-redux";
import PrivateChat from "../../components/PrivateChat";
import { ReduxState } from "../../Model/StateModel";

const mapStateToProps = (state:ReduxState) => ({
    friendAllMessages: state.friends.allMessages
})

export default connect(mapStateToProps)(PrivateChat);