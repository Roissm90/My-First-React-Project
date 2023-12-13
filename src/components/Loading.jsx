import LoadingImage from '../images/square-enix-logo.png';
import '../styles/_loading.scss';

function Loading() {
    return (
        <div className='container-loading'>
            <img src={LoadingImage} alt="imagen de carga" />
        </div>
    )
}
export default Loading;