import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

class ImageBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: false,
      isError: false,
    }
    this.image = undefined
    this.canvas = undefined
    this.transform = {
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
    }
  }

  componentDidMount() {
    this.showFile(this.props.src)
  }

  componentWillReceiveProps(props) {
    if (props.reset) {
      // 重置
      this.transform.scale = 1
      this.transform.rotate = 0
      this.transform.translateX = 0
      this.transform.translateY = 0
      this.fill()
      return
    }

    if (props.fullScreen) {
      // 平铺
      this.transform.scale = 1
      this.transform.rotate = 0
      this.transform.translateX = 0
      this.transform.translateY = 0
      this.draw()
      return
    }

    const scale = props.scale - this.props.scale
    if (scale !== 0) {
      // 缩放
      this.transform.scale = Math.max(0.1, this.transform.scale + (scale > 0 ? 0.1 : -0.1))
      this.draw()
    }

    if (props.src !== this.props.src) {
      // 切换
      this.setState({
        isComplete: false,
        isError: false,
      })
      this.showFile(props.src)
    }

    if (this.props.rotate !== props.rotate) {
      // 旋转
      this.transform.rotate = props.rotate
      this.draw()
    }
  }

  showFile = (src) => {
    this.image = new Image()
    this.image.src = src
    this.image.onload = () => {
      this.setState({
        isComplete: true,
        isError: false,
      }, () => {
        this.fill()
        this.draw()
      })
    }
    this.image.onerror = () => {
      this.setState({
        isComplete: true,
        isError: true,
      })
    }
  }

  fill = () => {
    let w
    let h
    if (this.transform.rotate % 2 === 0) {
      w = this.image.width
      h = this.image.height
    } else {
      w = this.image.height
      h = this.image.width
    }
    this.transform.scale = Math.min(this.canvas.width / w, this.canvas.height / h)
    this.transform.translateX = 0
    this.transform.translateY = 0
    this.draw()
  }

  draw = () => {
    const cw = this.canvas.width
    const ch = this.canvas.height
    const sw = this.image.width
    const sh = this.image.height
    const dx = ((cw - sw) / 2) - (cw / 2)
    const dy = ((ch - sh) / 2) - (ch / 2)
    const ctx = this.canvas.getContext('2d')

    ctx.save()
    ctx.clearRect(0, 0, cw, ch)
    ctx.translate(cw / 2, ch / 2)
    ctx.translate(this.transform.translateX, this.transform.translateY)
    ctx.rotate((this.transform.rotate * Math.PI) / 2)
    ctx.scale(this.transform.scale, this.transform.scale)
    ctx.drawImage(this.image, 0, 0, sw, sh, dx, dy, sw, sh)
    ctx.restore()
  }

  drag = (event) => {
    const pos = { translateX: this.transform.translateX, translateY: this.transform.translateY }
    pos.pageX = event.pageX
    pos.pageY = event.pageY
    // event.stopPropagation()
    // event.preventDefault()
    const this1 = this
    this.canvas.onmousemove = (e) => {
      this1.transform.translateX = pos.translateX + e.pageX - pos.pageX
      this1.transform.translateY = pos.translateY + e.pageY - pos.pageY
      this1.draw()
    }
    document.onmouseup = () => {
      this1.canvas.onmousemove = null
    }
  }

  render() {
    const { isComplete, isError, } = this.state
    const { width, height, loadingText, errorText } = this.props
    return (
      <div style={{ height: height }}>
        {
          !isComplete && (
            <span className='image-previewer-loading-tips'>
              <LoadingOutlined style={{ transform: 'scale(2)', margin: 20 }} />
              {loadingText}
            </span>
          )
        }
        {!isError && isComplete && (
          <canvas
            id="imagecanvas"
            width={width}
            height={height - 10}
            onMouseDown={this.drag}
            onContextMenu={e => e.preventDefault()}
            ref={instance => this.canvas = instance}
          />
        )}
        {
          isComplete && isError && (
            <span className='image-previewer-loading-tips'>
              {errorText}
            </span>
          )
        }
      </div>
    )
  }

}

export default ImageBox
