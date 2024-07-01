export const useSlider = () =>{
    const categorySettings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
    }

    return {
        categorySettings
    }
}