import React, { useState } from 'react'
import Slider from 'react-slick'
import uuid from 'react-uuid'
import placeholderImage from '../../assets/images/placeholder.jpg'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const ImageSlider = ({ images }) => {
	const [photoIndex, setPhotoIndex] = useState(0)
	const [isOpen, setIsOpen] = useState(false)

	const openLightBox = index => {
		setPhotoIndex(index)
		setIsOpen(true)
	}
	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
	}
	if (!images.length) {
		images.push({ id: uuid(), path: placeholderImage })
	}
	if (!images) return <></>

	return (
		<>
			<Slider {...settings} className={'gallery-slider'}>
				{images.map((item, key) => (
					<div
						key={item.id}
						className={'gallery-slider__item'}
						onClick={() => openLightBox(key)}
					>
						<img src={item.path} />
					</div>
				))}
			</Slider>
			{isOpen && (
				<Lightbox
					mainSrc={images[photoIndex].path}
					nextSrc={images[(photoIndex + 1) % images.length].path}
					prevSrc={
						images[(photoIndex + images.length - 1) % images.length].path
					}
					onCloseRequest={() => this.setState({ isOpen: false })}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + images.length - 1) % images.length)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % images.length)
					}
				/>
			)}
		</>
	)
}
export default ImageSlider
