import React from 'react';
import './Home.scss';
import $ from 'jquery';
import { useState, useEffect } from 'react';

const Home = () => {
    $(document).ready(function () {
        const themeSwitch = document.querySelector('#toggle-theme');

        // Hàm xử lý sự kiện "change" của input checkbox
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });

        $('#toggle-theme').on('click', function () {
            $(this).parent().toggleClass('checked');
        });
    });

    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div>
            <div className="banner d-flex align-items-center">
                <div className="banner-left">
                    <label className="switch d-flex">
                        <input id="toggle-theme" type="checkbox" />
                        <span className="light-txt">Sáng</span>
                        <span className="dark-txt">Tối</span>
                    </label>
                    <h1>
                        Dự Án <br /> Quản Lý <br /> Người Dùng
                    </h1>
                    <div className="inner-desc">
                        <p>
                            Dự án quản lý người dùng với các chức năng thêm sửa xóa người dùng đăng nhập đăng ký tài
                            khoản sắp xếp theo tên id.Tìm kiếm theo email.Phân quyền người dùng .Import và Export file
                            Excel
                        </p>
                        <form style={{ display: 'none' }}>
                            <div className="form-group d-flex flex-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputtext1"
                                    placeholder="Enter zipcode to search properties here"
                                />
                                <button type="submit" className="black-btn">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="social-icons d-flex align-items-center">
                        <ul className="d-flex">
                            <li>
                                <a href="https://www.facebook.com/modang0911/" target="_blank">
                                    <i class="fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/modang_0911/" target="_blank">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/minhdang0911" target="_blank">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            </li>
                        </ul>
                        <span>Theo dõi tôi</span>
                    </div>
                </div>
                <div className="banner-right d-flex">
                    <div className="family">
                        <img
                            src="https://www.meritto.com/wp-content/uploads/2021/11/Banner-image-User-Management.png"
                            alt="img"
                            className="img-fluid"
                        />
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNGKhg6O7Xx7-LynUVtDatc5iVkNuQLThhGeoSjO6UQg&s"
                            alt="img"
                            className="img-fluid"
                        />
                        <div className="banner-right-inner">
                            <h2>42k+</h2>
                            <span>{/* satisfied <br /> family */}</span>
                            <img
                                src="https://yudiz.com/codepen/real-estate/heart-icon.svg"
                                alt="heart-icon"
                                className="img-fluid"
                            />
                        </div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPslDJVpgy_nsIMc2nOZEjsxvTBMnARxvclxS6v-vhIMpoxON-s6AhsGw534iim8ZNsjg&usqp=CAU"
                            alt="img"
                            className="img-fluid"
                        />
                        <img
                            src="https://www.meritto.com/wp-content/uploads/2021/11/Advanced-User-Manager.png"
                            alt="img"
                            className="img-fluid"
                        />
                    </div>
                    <div className="sale">
                        <img
                            src="https://www.meritto.com/wp-content/uploads/2021/11/User-Activity-Logs-min.png"
                            alt="img"
                            className="img-fluid"
                        />
                        <img
                            src="https://img.lovepik.com/free-template/20231113/lovepik-mobile-social-media-platform-user-tags-tube-web-banner-image_8919870_list.jpg"
                            alt="img"
                            className="img-fluid"
                        />
                        <div className="banner-right-inner">
                            <h2>30k+</h2>
                            <span>{/* Available <br /> Unit for Sale */}</span>
                            <img
                                src="https://yudiz.com/codepen/real-estate/unit-icon.svg"
                                alt="unit-icon"
                                className="img-fluid"
                            />
                        </div>
                        <img
                            src="https://www.miniorange.com/images/user-management/user-management.webp"
                            alt="img"
                            className="img-fluid"
                        />
                        <img src="https://www.codejig.com/_nuxt/img/5e93e0d.png" alt="img" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
