import Link from 'next/link';

export default function Bar() {
  return (
    <div className={'bar'}>
      <div className={'bar__content'}>
        <div className={'bar__playerProgress'}></div>
        <div className={'bar__playerBlock'}>
          <div className={'bar__player'}>
            <div className={'player__controls'}>
              <div className={'player__btnPrev'}>
                <svg className={'player__btnPrevSvg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={'player__btnPlay btn'}>
                <svg className={'player__btnPlaySvg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                </svg>
              </div>
              <div className={'player__btnNext'}>
                <svg className={'player__btnNextSvg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className={'player__btnRepeat btnIcon'}>
                <svg className={'player__btnRepeatSvg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={'player__btnShuffle btnIcon'}>
                <svg className={'player__btnShuffleSvg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={'player__trackPlay'}>
              <div className={'trackPlay__contain'}>
                <div className={'trackPlay__image'}>
                  <svg className={'trackPlay__svg'}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={'trackPlay__author'}>
                  <Link className={'trackPlay__authorLink'} href="">
                    Ты та...
                  </Link>
                </div>
                <div className={'trackPlay__album'}>
                  <Link className={'trackPlay__albumLink'} href="">
                    Баста
                  </Link>
                </div>
              </div>

              <div className={'trackPlay__dislike'}>
                <div className={'player__btnShuffle btnIcon'}>
                  <svg className={'trackPlay__likeSvg'}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={'trackPlay__dislike btnIcon'}>
                  <svg className={'trackPlay__dislikeSvg'}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={'bar__volumeBlock'}>
            <div className={'volume__content'}>
              <div className={'volume__image'}>
                <svg className={'volume__svg'}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={'volume__progress btn'}>
                <input
                  className={'volume__progressLine btn'}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
