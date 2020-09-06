import Head from 'next/head'
import * as  jsonexport from 'jsonexport'

const writeAndDownload = async(data, fileName, fileType) => {

  const file = new Blob([data], {type: fileType})

  let link = document.createElement("a")
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  
  link.click();

  setTimeout(() => {
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }, 0)
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fileName: null, 
      selectedFile: null, 
      jsonContent: null,
      loading: false
    }
  }

  forcedUpload = () => {
    const e = document.getElementById('uploadInput')
    e.click();
  }

  onFileUpload = () => { 
    if (this.state.jsonContent) {

      
      this.setState({loading: true})


      const title = String(this.state.selectedFile.name).replace('.json', '')
      
      jsonexport(this.state.jsonContent, function(err, csv){
        if(err) return console.log(err);
        writeAndDownload(csv, title, 'text/csv')
      });

      setTimeout(() => {      
          this.setState({loading: false})
      }, 1000)

    } else {
      console.warn('No value')
    }
  }

  onFileChange = event => { 
    const file = event.target.files[0];
    if (file) {

      this.setState({fileName: file.name, selectedFile: file})
  
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      
      reader.onload = (data) => {

        this.setState({jsonContent: JSON.parse(data.target.result)})
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>Free and Unlimited JSON to CSV converter</title>
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content ="The fastest, easiest and most reliable tool to convert JSON to CSV, totally free, unlimited and open source" />
          <meta property="og:title" content="Free and Unlimited JSON to CSV converter"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="http://jsoncsv.org/"/>
          {/* <meta property="og:image" content="img/og-banner.png"> */}
          <meta property="og:description" content="The fastest, easiest and most reliable tool to convert JSON files to CSV or Excel, totally free, unlimited and open source"/>
        </Head>

        <main>
          {this.state.loading && 
          <div className="loading">
          </div>}
          <h1 className="title">
            Free  <span>JSON</span> to <span>CSV</span> converter
          </h1>

          <h2 className="description">
            Convert unlimited <span>JSON</span> files<br/><br/>
            <code>// MAXIMUM FILE SIZE: <span>UNLIMITED</span></code>
          </h2>

          <div className="box">
              <h3><span>Upload</span> or <span>past</span> your JSON!</h3>
              <p>Click the button below to upload the file, <label htmlFor="txtJSON"> or paste the text in the input.</label></p>
              
              <div className="actions">
                  <div className="justUpload">
                    <button onClick={ this.forcedUpload }><img src="/cloud.svg" alt="Vercel Logo" className="btn-img" /> <br></br>Upload JSON file</button>
                    <input id="uploadInput" type="file"  accept="application/JSON" onChange={this.onFileChange} /> 
                  </div>
              </div>
             {this.state.fileName && 
              <div className="actions">
                  <div className="full-relative">
                    <button className="convert-btn" onClick={ this.onFileUpload }>Convert {this.state.fileName}</button>
                  </div>
              </div>}
          </div>

          <div className="grid">
            <a href="https://buymeacoff.ee/matthsena" target="_blank"
            rel="noopener noreferrer" className="card">
              <h3>Buy me a coffee &rarr;</h3>
              <p>Donating any amount you help to keep the <span>site online</span>.</p>
            </a>

            <a href="https://github.com/matthsena/jsoncsv.org" target="_blank"
            rel="noopener noreferrer" className="card">
              <h3>See on GitHub &rarr;</h3>
              <p>Collaborate with the project or just take a look!</p>
            </a>
          </div>
          
          <div className="grid">
                <h3>Why convert <strong>JSON to CSV</strong>?</h3>
                <p>JSON (JavaScript Object Notation) is awesome file format to save and use data, 
                    uses human-readable text to store data objects consisting of attribute–value pairs and array data types, 
                    some NoSQL databases are JSON based and the most modern APIs return JSON data.
                </p>
                <p>CSV (Comma-separated values) is an awesome file format too, but it's more readable to non programmers or to build 
                     simple and fast analyzes, because is very similar to a spreadsheet, you can open this file on Excel, Libreoffice Calc, Google Sheets and etc.
                </p>
                <p>You can take advantage of both formats! Retrive data from a modern source and just <strong>convert JSON to CSV</strong>! Convert <span>unlimited</span> JSON files with 
                <span>unlimited</span> file size.
                </p>
            </div>



        </main>

        <footer>
          <a
            href="https://github.com/matthsena/jsoncsv.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by &nbsp;<span>Matheus Alexandre de Sena</span>{' '}
            <img src="/github.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>

        <style jsx>{`
          .loading {
            position: fixed;
            height: 0.3rem;
            width: 100vw;
            left: 0;
            top: 0;
            background: rgba(0, 112, 243, 0.35);
          }

          .loading::before {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            height: 100%;
            width: 20vw;
            background: #0070f3;
            z-index: 2;
            animation: loading 1s infinite linear;
            transition: all 250ms;
          }

          @keyframes loading {
              0% { left: 0; }
              20% { left: 20vw; }
              40% { left: 40vw; }
              60% { left: 60vw; }
              80% { left: 80vw; }
              100% { left: 100vw; }
          }

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
          .justUpload {
            position: relative;
            left: 50%;
            rigth: -50%;
            transform: translateX(-50%);
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
          code span {
            color: #000;
            text-decoration: underline
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
          textarea, button {
            padding: 1rem;
            font-size: 1rem;
          }

          .convert-btn {
            padding: 0.5rem 1rem;
            background: #ffab00;
            color: #000
          }
          button .btn-img {
            max-height: 3rem;
            position: absolute;
            top: 0.5rem;
            transform: translateX(-50%);
            left: 50%;
          }
          button {
            background: #0070f3;
            font-weight: bold;
            color: white;
            border-radius: 10px;
            border: none;
            height: 100%;
            line-height: 2rem;
          }
          button:hover {
            cursor: pointer;
            opacity: 0.75;
            transition: opacity .25s linear;
          }
          button:active, button:focus, button:target {
            outline: none;
          }
          button:active {
            background: #000;
            background-size: 100%;
            transition: background 0s;

          }
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 800px;
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
}


export default Home