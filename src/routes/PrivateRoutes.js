import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                {' '}
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>Bạn cần đăng nhập để thực hiện tính năng này</p>
                </Alert>
            </>
        );
    }
    return <>{props.children}</>;
};

export default PrivateRoutes;
