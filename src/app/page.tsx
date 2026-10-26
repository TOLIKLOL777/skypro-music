import Image from 'next/image';
import Link from 'next/link';
import './page.css';
import styles from './page.module.css';
import classNames from 'classnames';
import Bar from '@/components/bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={'container'}>
        <main className={'main'}>
          <nav className={'main__nav'}>
            {/* TODO Component */}
            <div className={'nav__logo'}>
              <Image
                width={250}
                height={170}
                className={'logo__image'}
                src="/img/logo.png"
                alt={'logo'}
              />
            </div>
            <div className={'nav__burger'}>
              <span className={'burger__line'}></span>
              <span className={'burger__line'}></span>
              <span className={'burger__line'}></span>
            </div>
            <div className={'nav__menu'}>
              <ul className={'menu__list'}>
                <li className={'menu__item'}>
                  {/*TODO: a -> Link*/}
                  <Link href="#" className={'menu__link'}>
                    Главное
                  </Link>
                </li>
                <li className={'menu__item'}>
                  <Link href="#" className={'menu__link'}>
                    Мой плейлист
                  </Link>
                </li>
                <li className={'menu__item'}>
                  <Link href="../signin.html" className={'menu__link'}>
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className={'centerblock'}>
            {/* TODO Component */}
            <div className={'centerblock__search'}>
              <svg className={'search__svg'}>
                <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
              </svg>
              <input
                className={'search__text'}
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className={'centerblock__h2'}>Треки</h2>
            <div className={'centerblock__filter'}>
              <div className={'filter__title'}>Искать по:</div>
              <div className={'filter__button'}>исполнителю</div>
              <div className={'filter__button'}>году выпуска</div>
              <div className={'filter__button'}>жанру</div>
            </div>
            <div className={'centerblock__content'}>
              <div className={'content__title'}>
                <div
                  className={classNames(
                    styles.playlistTitle__col,
                    styles.col01,
                  )}
                >
                  Трек
                </div>
                <div
                  className={classNames(
                    styles.playlistTitle__col,
                    styles.col02,
                  )}
                >
                  Исполнитель
                </div>
                <div
                  className={classNames(
                    styles.playlistTitle__col,
                    styles.col03,
                  )}
                >
                  Альбом
                </div>
                <div
                  className={classNames(
                    styles.playlistTitle__col,
                    styles.col04,
                  )}
                >
                  <svg className={'playlistTitle__svg'}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className={'content__playlist'}>
                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="">
                          Guilt <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="">
                        Nero
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="">
                        Welcome Reality
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>4:44</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="">
                          Elektro <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="">
                        Dynoro, Outwork, Mr. Gee
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="">
                        Elektro
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="">
                          I’m Fire <span className={'track__titleSpan'}></span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="">
                        Ali Bakgor
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="">
                        I’m Fire
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:22</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div className="track__title-text">
                        <Link className={'track__titleLink'} href="">
                          Non Stop
                          <span className={'track__titleSpan'}>(Remix)</span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="">
                        Стоункат, Psychopath
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="">
                        Non Stop
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>4:12</span>
                    </div>
                  </div>
                </div>

                <div className={'playlist__item'}>
                  <div className={'playlist__track'}>
                    <div className={'track__title'}>
                      <div className={'track__titleImage'}>
                        <svg className={'track__titleSvg'}>
                          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                        </svg>
                      </div>
                      <div>
                        <Link className={'track__titleLink'} href="">
                          Run Run
                          <span className={'track__titleSpan'}>
                            (feat. AR/CO)
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className={'track__author'}>
                      <Link className={'track__authorLink'} href="">
                        Jaded, Will Clarke, AR/CO
                      </Link>
                    </div>
                    <div className={'track__album'}>
                      <Link className={'track__albumLink'} href="">
                        Run Run
                      </Link>
                    </div>
                    <div className="track__time">
                      <svg className={'track__timeSvg'}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                      <span className={'track__timeText'}>2:54</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'main__sidebar'}>
            {/* TODO Component */}
            <div className={'sidebar__personal'}>
              <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
              <div className={'sidebar__icon'}>
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className={'sidebar__block'}>
              <div className={'sidebar__list'}>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
                <div className={'sidebar__item'}>
                  <Link className={'sidebar__link'} href="#">
                    <Image
                      className={'sidebar__img'}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
