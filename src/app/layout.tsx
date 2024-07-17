import credits from '../app/styles/credits.module.css';
import layout from '../app/styles/layout.module.css';

const Bootstrap = () => 
<>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
</>

const Credits = ({yourName}:{yourName:string}) => 
  <div className={`${credits.credits} p-1`}>
    <p> Organizador de categorías <span className={credits.divisor}>|</span> {yourName} </p>
  </div>

const RootLayout = ({children}:Readonly<{children: React.ReactNode}>) => {

  return(
    <html lang='es'>
      <head><Bootstrap/></head>
      <body className={layout.layout}>{children}<Credits yourName={'Nombre del participante'}/></body>
    </html>
  );

}

export default RootLayout