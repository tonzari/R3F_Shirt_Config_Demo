import { Logo } from '@pmndrs/branding'
import { AiOutlineHighlight, AiOutlineShopping, AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store.js'
import { AnimatePresence, backInOut, motion, spring } from 'framer-motion'
export default function Overlay() {

    // valtio state management used here. see: https://valtio.pmnd.rs/docs/introduction/getting-started
    const snap = useSnapshot(state)

    const transition = { type: spring, duration: 1 }
    const framerConfig = {
        initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
        animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
        exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
      }
    
    return (
        <>
            <div className="container">
                <motion.header
                    initial={{opacity:0, y: -120}}
                    animate={{opacity:1, y: 0}}
                    transition={{duration: 1, type: backInOut, delay: 1}}
                >
                    <Logo width="40" height="40" />
                    <div>
                        <AiOutlineShopping size="3em" />
                    </div>
                </motion.header>
                <AnimatePresence>
                    { snap.intro ? <Intro key="main" framerConfig={framerConfig}/> : <Customizer key="custom" framerConfig={framerConfig}/> }
                </AnimatePresence>
            </div>
        </>
    )
}

function Intro({framerConfig}) {
    return (
        <motion.section 
            key="main"
            {...framerConfig}
        >
          <div className="section--container">
            <div>
              <h1>LET'S DO IT.</h1>
            </div>
            <div className="support--content">
              <div>
                <p>
                  Create your unique and exclusive shirt with our brand-new 3D
                  customization tool. <strong>Unleash your imagination</strong>{' '}
                  and define your own style.
                </p>
                <button 
                    style={{ background: 'black' }}
                    onClick={() => {
                        state.intro = false
                    }}
                >
                  CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

    )
  }

  function Customizer({framerConfig}) {
    const snap = useSnapshot(state)

    const colors = [
      "#ccc",
      "#EFBD4E",
      "#80C670",
      "#726DE8",
      "#EF674E",
      "#353934",
    ];
    const decals = ["react", "three2", "pmndrs"];

    return (
      <motion.section 
        key="custom"
        {...framerConfig}
    >
        <div className="customizer">
          <div className="color-options">
            {colors.map((color) => (
              <div
                key={color}
                className="circle"
                style={{ background: color }}
                onClick={()=>{state.selectedColor = color}}
              ></div>
            ))}
          </div>
          <div className="decals">
            <div className="decals--container">
              {decals.map((decal) => (
                <div 
                    key={decal} 
                    className="decal"
                    onClick={() => {
                        state.selectedDecal = decal
                    }}
                >
                  <img src={decal + "_thumb.png"} alt="brand" />
                </div>
              ))}
            </div>
          </div>
          <button 
            className="share" 
            style={{ background: snap.selectedColor }}
            onClick={() => {
                // create screenshot
                const link = document.createElement('a')
                link.setAttribute('download', 'canvas.png')
                link.setAttribute(
                    'href',
                    document
                        .querySelector('canvas')
                        .toDataURL('image/png')
                        // .replace('image/png', 'image/octet-stream') // is this necessary?
                )
                link.click()
                }}
           >
            DOWNLOAD
            <AiFillCamera size="1.3em" />
          </button>
          <button
            className="exit"
            style={{ background: "black" }}
            onClick={() => (state.intro = true)}
          >
            GO BACK
            <AiOutlineArrowLeft size="1.3em" />
          </button>
        </div>
      </motion.section>
    );
  }
  