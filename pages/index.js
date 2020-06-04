import Head from 'next/head'

let selectedFile

const onFileChange = event => { 
  selectedFile = event.target.files[0];  
}; 

const onFileUpload = () => { 
     console.log(selectedFile)
}; 

const fakeUpload = () => {
  const e = document.getElementById('uploadInput')
  e.click();
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>JSON to CSV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          
          Free  <span>JSON</span> to <span>CSV</span> converter
          {/* <a href="https://nextjs.org">Next.js!</a> */}
        </h1>

        <h2 className="description">
          Convert unlimited <span>JSON</span> files<br/><br/>
          <code>// MAXIMUM FILE SIZE: <span>UNLIMITED</span></code>
        </h2>

        <div className="box">
            <h3><span>Upload</span> or <span>past</span> your JSON!</h3>
            <p>Click the button below to upload the file, or paste the text in the input.</p>
            
            <div className="actions">
                <div className="half-relative">
                {/* <button onClick={ onFileUpload }><img src="/cloud.svg" alt="Vercel Logo" className="btn-img" /> <br></br>Upload JSON file</button> */}
                <button onClick={ fakeUpload }><img src="/cloud.svg" alt="Vercel Logo" className="btn-img" /> <br></br>Upload JSON file</button>

                  {/* <label for="uploadInput"><img src="/cloud.svg" alt="Vercel Logo" className="btn-img" /> <br></br>Upload JSON file</label> */}
                    <input id="uploadInput" type="file" onChange={onFileChange} /> 
                </div>
                <div className="half-relative">
                    <textarea cols="30" rows="5" placeholder="Paste or JSON data"></textarea>
                </div>
            </div>
            <div className="actions">
                <div className="full-relative">
                </div>
            </div>
        </div>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Buy me a coffee &rarr;</h3>
            <p>Donating any amount you help to keep the site online <span>without ads.</span></p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>See on GitHub &rarr;</h3>
            <p>Collaborate with the project or just take a look!</p>
          </a>

          {/* <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by &nbsp;<span>Matheus Alexandre de Sena</span>{' '}
          <img src="/github.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
       span {
          color: #0070f3;
          font-weight: bold;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #eaeaea;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .box {
          diplay: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 800px;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          // background:  #f2f2f2;
        }

        .actions {
          margin: 1rem 0 0;
          display: flex;
          flex-wrap: wrap;
        }
        .full-relative {
          flex: 0 0 100%;
          max-width: 100%;
        }
        .half-relative {
          flex: 0 0 50%;
          max-width: 50%
        }
        .half-relative *, .full-relative * {
          position: relative;
          transform: translateX(-50%);
          left: 50%;
        }
        input {
          display: none;
        }
        textarea, button, label {
          padding: 1rem;
          font-size: 1rem;
        }
        button .btn-img, label .btn-img {
          max-height: 3rem;
          position: absolute;
          top: 0.5rem;
          transform: translateX(-50%);
          left: 50%;
        }
        button, label {
          background: #0070f3;
          font-weight: bold;
          color: white;
          border-radius: 10px;
          border: none;
          height: 100%;
          line-height: 2rem;
        }
        button:hover, label:hover {
          cursor: pointer;
          opacity: 0.75;
          transition: opacity .25s linear;
        }
        button:active, button:focus, button:target {
          outline: none;
        }
        button:active, label:active {
          background: #000;
          background-size: 100%;
          transition: background 0s;

        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 2rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3, .box h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p, .box p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 2em;
        }

        @media (max-width: 600px) {
          .grid, .box {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
