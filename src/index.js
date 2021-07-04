import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import {
  RotateRightOutlined,
  RotateLeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import ImageBox from './ImageBox'
import './index.less'

const defaultState = {
  mode: 'single',
  width: 500,
  height: 500,
  loadingText: '',
  errorText: '',
  watermarkText: '',
  allowWheelScale: false,
  fileList: [],
}

const stateTypes = {
  mode: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loadingText: PropTypes.string,
  errorText: PropTypes.string,
  watermarkText: PropTypes.string,
  allowWheelScale: PropTypes.bool,
  fileList: PropTypes.array,
}

class ImagePreviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
      ...props,
      src: props.fileList[0].src,
      index: 0,
      rotate: 0,
      scale: 1,
      resetCount: 0,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      ...props,
    })
  }

  onPrev = () => {
    const { index } = this.state
    const { fileList } = this.props
    this.setState({
      src: fileList[index - 1].src,
      index: index === 0 ? 0 : index - 1,
      resetCount: 0,
    })
  }

  onNext = () => {
    const { index } = this.state
    const { fileList } = this.props
    this.setState({
      src: fileList[index + 1].src,
      index: index === fileList.length ? index : index + 1,
      resetCount: 0,
    })
  }

  onRotate = (v) => {
    let rotate = this.state.rotate + v
    if (rotate < 0) {
      rotate += 4
    } else if (rotate >= 4) {
      rotate -= 4
    }
    this.setState({ rotate, resetCount: 0 })
  }

  onZoom = (v) => {
    this.setState({
      scale: this.state.scale + v,
      resetCount: 0,
    })
  }

  onReset = () => {
    this.setState({ resetCount: this.state.resetCount + 1 })
  }

  render() {
    const {
      src,
      width,
      height,
      mode,
      scale,
      rotate,
      resetCount,
      index,
      fileList,
    } = this.state
    return (
      <div className='image-previewer' style={{ width: width, height: height, position: 'relative' }}>
        <ImageBox
          {...this.props}
          height={height - 80}
          src={src}
          scale={scale}
          rotate={rotate}
          resetCount={resetCount}
        />
        <div className='image-previewer-operation-bar'>
          {mode === 'multiple' && (
            <Fragment>
              <Button onClick={this.onPrev} disabled={index === 0}>
                <LeftOutlined />
              </Button>
              <Button onClick={this.onNext} disabled={index === fileList.length - 1}>
                <RightOutlined />
              </Button>
            </Fragment>
          )}
          <Button onClick={() => this.onRotate(-1)}>
            <RotateLeftOutlined />
          </Button>
          <Button onClick={() => this.onRotate(+1)}>
            <RotateRightOutlined />
          </Button>
          <Button onClick={() => this.onZoom(+0.1)}>
            <ZoomInOutlined />
          </Button>
          <Button onClick={() => this.onZoom(-0.1)}>
            <ZoomOutOutlined />
          </Button>
          <Button onClick={this.onReset}>
            reset
          </Button>
        </div>
      </div>
    )
  }
}

ImagePreviewer.propTypes = stateTypes

export default ImagePreviewer
