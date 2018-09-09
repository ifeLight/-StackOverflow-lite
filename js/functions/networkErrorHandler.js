import Loader from './loader';
import alert from './alert';

const networkErrorHandler = (err) => {
    const loader = new Loader();
    loader.hide();
    alert('There is something wrong with your network', "Network Error");
}

export default networkErrorHandler;