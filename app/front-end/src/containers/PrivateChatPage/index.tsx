import { connect } from "react-redux";
import PrivateChat from "../../components/PrivateChat";
import { ReduxState } from "../../Model/StateModel";

const mapStateToProps = (state:ReduxState, ownProps:any) =>{
    const username =  ownProps.match.params.username;
    const messageList = state.privateMessages.byUsers[username] || [];
    const hasMoreMessage = state.privateMessages.hasMoreMessageByUser[username];
    const loginUsername = state.user.userInfo.username;
    const tempImages = state.privateMessages.tempImage;
    return {messageList, hasMoreMessage, loginUsername, tempImages}
}

export default connect(mapStateToProps)(PrivateChat);