import React, { Fragment } from 'react';
import { IntroSlider } from '@pspatel/react-native-app-intro';
import Images from '../styles/images';
import { KButton } from '../components/KButton';
import { Platform } from 'react-native';
import Color from '../styles/color';

const OnBoardingScreen = () => {
    return (
        <Fragment>
            <IntroSlider
                showPagination
                buttonProps={{
                    showSkipButton: true,
                    onDonePress: () => {
                        alert('Done Pressed');
                    },
                }}
                paginationProps={{
                    animationType: 'expanding',
                    dotSpacing: 8,
                  }}>
                <IntroSlider.Page
                    title={'A Personal Computer'}
                    image={Images.Board1}
                    containerStyle={{ backgroundColor: Color.white }}
                    description={
                        'Computer Science is no more about computers than astronomy is about the telescopes ...'
                    }
                />
                <IntroSlider.Page
                    title={'A Smartphone'}
                    image={Images.Board2}
                    containerStyle={{ backgroundColor: Color.white }}
                    description={
                        'Mobile phone usage is on the rise and smartphone lovers are on a constant hunt to buy the best smartphone at a reasonable price'
                    }
                />
                <IntroSlider.Page
                    title={'A Smart watch'}
                    image={Images.Board3}
                    containerStyle={{ backgroundColor: Color.white }}
                    description={
                        'A watch has become so much more than something to tell time. With smart watches ...'
                    }
                />
            </IntroSlider>
            
        </Fragment>
    )
}

export default OnBoardingScreen;