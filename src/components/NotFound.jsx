import { Link } from 'react-router-dom';
import './NotFound.css';
const NotFound = () => {
    return (
        <>
            <main class="bl_page404">
                <h1>Error 404. Trang bạn tìm kiếm không tồn tại</h1>
                <p style={{ color: 'black' }}>
                    "Xin lỗi! Trang bạn đang tìm không thể được tìm thấy. Có thể trang bạn yêu cầu đã được di chuyển
                    hoặc xoá. Hoặc có thể bạn đã gõ sai một chút khi nhập địa chỉ. Hãy quay về trang chính
                </p>
                <div class="bl_page404__wrapper">
                    <img
                        src="https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/cloud_warmcasino.png?raw=true"
                        alt="cloud_warmcasino.png"
                    />
                    <div class="bl_page404__el1"></div>
                    <div class="bl_page404__el2"></div>
                    <div class="bl_page404__el3"></div>
                    <Link to="/" className="bl_page404__link ">
                        go home
                    </Link>
                </div>
            </main>
        </>
    );
};

export default NotFound;
