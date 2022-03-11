import React, { Component, useState } from 'react'
import NavClient from './NavClient'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    Container, Row, Col, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Image,
    ListGroupItem
} from 'reactstrap';

const items = [
    {
        src:'https://cms.yame.vn/uploads/29661e70-3512-44c6-9620-49f542b11e3f-MOBAN412.jpg',
       
    },
    {
        src:'https://cms.yame.vn/uploads/c1e47f69-be21-48ff-bec8-cc87426bbe18-Thum%20blog%2002.jpg',
        
    },
    {
        src:'https://cms.yame.vn/uploads/0b6bed15-b174-423c-b52f-0d1138d1ea49-Thum%20web%20MB%2020.11%20fix.jpg',
       
    }
];
const imgsRow = [
    {
        src:'https://cdn2.yame.vn/pimg/ao-thun-tn-tc-lybi-ver3-0019930/c7a2b0d0-d008-0100-5331-0017707ad8c7.jpg?w=540&h=756&c=true',
       
    },
    {
        src:'https://cdn3.yame.vn/pimg/ao-thun-nam-y2010-bd-b26-0019841/69ffdac2-7483-0300-b661-00176e43b668.jpg?w=540&h=756&c=true',
        
    },
    {
        src:'https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-bf01-0019691/f6645405-cc2b-1600-68ba-001742e826e7.jpg?w=540&h=756&c=true',
       
    },
    {
        src:'https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-ai05-0019492/21382671-ade6-1400-b185-00171620db3e.jpg?w=540&h=756&c=true'
    }
];
function Home(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src}  />
                <CarouselCaption  />
            </CarouselItem>
        );
    });
 
    return (
        <React.Fragment>
            <NavClient>

            </NavClient>
            <Container>
                <Row className="Row-Product p-0">
                    <Col  className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-tn-tc-lybi-ver3-0019930/c7a2b0d0-d008-0100-5331-0017707ad8c7.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn3.yame.vn/pimg/ao-thun-nam-y2010-bd-b26-0019841/69ffdac2-7483-0300-b661-00176e43b668.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-bf01-0019691/f6645405-cc2b-1600-68ba-001742e826e7.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-ai05-0019492/21382671-ade6-1400-b185-00171620db3e.jpg?w=540&h=756&c=true"></img></Col>
                </Row>
                <Row className="content">Sự kiện nổi bật</Row>
                <Row>
                      <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                </Row>
                <Row className="content">Các sản phẩm  bán chạy trong tháng này</Row>
                <Row className="Row-Product p-0">
                    <Col  className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-tn-tc-lybi-ver3-0019930/c7a2b0d0-d008-0100-5331-0017707ad8c7.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn3.yame.vn/pimg/ao-thun-nam-y2010-bd-b26-0019841/69ffdac2-7483-0300-b661-00176e43b668.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-bf01-0019691/f6645405-cc2b-1600-68ba-001742e826e7.jpg?w=540&h=756&c=true"></img></Col>
                    <Col className="Product-Img" md={3}><img src="https://cdn2.yame.vn/pimg/ao-thun-nam-y2010-basic-ai05-0019492/21382671-ade6-1400-b185-00171620db3e.jpg?w=540&h=756&c=true"></img></Col>
                </Row>
                    
            </Container>
            <Container id="footer" fluid>
                <Row>
                    <Col md={4}>
                       <img className="img-logo" src="data:image/png;base64,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">

                       </img>
                       <div className="content-big">Thông tin</div>
                       <div className="info">Giới thiệu về YaMe.vn</div>
                       <div className="info">Tuyển dụng</div>
                       <div className="info">Quy chế hoạt động</div>
                       <div className="info">Mã Voucher giảm giá</div>
                    </Col>
                    <Col md={4}>
                    <div className="info">Đặt hàng và thu tiền tận nơi toàn quốc</div>

                        <div className="content-big mb-3">(028) 7307 1441</div>
                        <div className="content-big">CSKH
                        </div>
                        <div className="info"> Than phiền/Chăm sóc khách hàng</div>
                        <div className="content-big">FAQ</div>
                        <div className="info">Vận chuyển</div>
                        <div className="info">Chính sách đổi trả</div>
                        <div className="info">Chính sách bảo hành</div>
                        <div className="info">Khách hàng VIP</div>
                        <div className="info">Đối tác cung cấp</div>

                    </Col>
                    <Col md={4}>
                        <div className="info">Hệ thống cửa hàng YaMe.vn</div>
                        <div className="info">
                        <FontAwesomeIcon icon={['fa' , 'map-marker']} className="icon-location"/>
                            TP.HỒ CHÍ MINH</div>
                            <div className="info">
                        <FontAwesomeIcon icon={['fa' , 'map-marker']} className="icon-location"/>
                            TÂY NAM BỘ</div>
                            <div className="info">
                        <FontAwesomeIcon icon={['fa' , 'map-marker']} className="icon-location"/>
                            ĐÔNG NAM BỘ & TÂY NGUYÊN</div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default Home
