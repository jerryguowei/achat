import {connect} from 'react-redux';
import SideBar from '../../components/SideBar';
import { ReduxState } from '../../Model/StateModel';


function mapStateToProps(state: ReduxState){
    return {
        userInfo: state.user.userInfo,
        notViewCount: state.privateMessages.notViewCount
    }
}
export default connect(mapStateToProps)(SideBar);