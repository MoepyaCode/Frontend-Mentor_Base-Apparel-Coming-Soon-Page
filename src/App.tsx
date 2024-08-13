import React, { ElementRef } from 'react'
import { Container, Main, Wrapper } from './components'
import { Assets } from './assets'

export default function App() {
  const [width, setWidth] = React.useState(window.innerWidth)
  const isMobile = width < 768
  const [error, setError] = React.useState('')
  const emailRef = React.useRef<ElementRef<'input'>>(null)

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()

      if (emailRef.current?.value !== '') {
        const email = emailRef.current?.value
        if (!email) throw new Error('Please provide a valid email')
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error('Please provide a valid email')
      } else {
        throw new Error('Please provide a valid email')
      }

      setError('');
      (e.target as HTMLFormElement).reset()
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <Main className='relative font-josefin bg-linear flex flex-col min-w-full md:flex-row overflow-hidden'>

      <Container className='relative flex flex-col lg:pt-[64.91px] lg:px-[165px] lg:pb-[152px] md:justify-evenly lg:justify-between'>
        {!isMobile ? (
          <img className='absolute top-0 left-0' src={Assets.bgPatterDesktop} alt="" />
        ) : ''
        }

        <Wrapper className='z-10'>
          <header className='h-[84px] pl-[32px] flex items-center gap-[7px]'>
            <img className='object-contain w-[100px] md:w-[154px]' src={Assets.logo} alt="" />
          </header>

          {isMobile ? (
            <img className='h-[250px] w-full' src={Assets.heroMobile} alt="" />
          ) : ''
          }

          <Wrapper className='pt-[64px] px-[32px] pb-[92px] lg:p-0 text-center md:text-left grid gap-[32px] md:gap-[40px]'>
            <Wrapper className='flex flex-col gap-[16px] md:gap-[32px]'>
              <Wrapper>
                <h1 className='font-semibold text-[40px] md:text-[64px] leading-[42px] md:leading-[71px] tracking-[10.83px] md:tracking-[17.32px]'>
                  <span className='font-light text-[#CE9898]'>WE'RE</span>
                  <br />
                  COMING
                  <br />
                  SOON
                </h1>
              </Wrapper>

              <p className='text-[14px] md:text-[16px] text-[#CE9898] leading-[22px] md:leading-[28px] tracking-[0]'>
                Hello fellow shoppers! We're currently building our new fashion store. Add your email below to stay up-to-date with announcements and our launch deals.
              </p>
            </Wrapper>

            <form onSubmit={onSubmit} className='relative flex flex-nowrap items-center outline-none border border-[rgba(206,152,152,.5)] rounded-full'>
              <input ref={emailRef} className='flex-grow-[1] h-full rounded-l-full pl-[24px] md:pl-[32px] focus:outline-none focus:border-spacing-2 focus:border-[#F96464] text-[#423A3A] placeholder-[#CE9898] placeholder:opacity-50' placeholder='Email Address' type="text" name="text" id="text" autoComplete='off' />
              <img className={`transition-all duration-300 ${(isMobile && error) ? 'mr-[8px]' : 'mr-[-32px]'} ${!isMobile && error ? 'md:mr-[16px]' : 'mr-[-32px]'}`}
                  src={Assets.iconError} alt="" />
              <button className='bg-gradient-to-br from-[#F8BFBF] to-[#EE8B8B] w-[64px] md:w-[100px] h-[48px] md:h-[56px] grid place-items-center rounded-full shadow-[0_15px_20px_0px_rgba(198,110,110,.2476)]' type="submit">
                <img src={Assets.iconArrow} alt="" />
              </button>
              {error && <p className='absolute bottom-[-32px] left-[24px] md:left-[32px] text-[#F96464] leading-[28px] text-[13px]'>{error}</p>}
            </form>
          </Wrapper>
        </Wrapper>
      </Container>

      {!isMobile ? (
        <img className='object-fill' src={Assets.heroDesktop} alt="" />
      ) : ''
      }
    </Main>
  )
}
