import Head from 'next/head'
import * as  jsonexport from 'jsonexport'

const writeAndDownload = (data, fileName, fileType) => {

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
      textAreaValue: '', 
      selectedFile: null, 
      jsonContent: null
    }
  }

  updateTextAreaValue = event => {
    this.setState({
      textAreaValue: event.target.value
    })
  }

  forcedUpload = () => {
    const e = document.getElementById('uploadInput')
    e.click();
  }

  onFileUpload = () => { 
    if (this.state.textAreaValue) {
      try {
        
        const txt = JSON.parse(this.state.textAreaValue)
        
        jsonexport(txt,function(err, csv){
          if(err) return console.log(err);
          console.log(csv);
          writeAndDownload(csv, 'converted', 'text/csv')
        });
      } catch (error) {
        console.error(error)
      }
    } else if (this.state.jsonContent) {

      const title = String(this.state.selectedFile.name).replace('.json', '')
      
      jsonexport(this.state.jsonContent,function(err, csv){
        if(err) return console.log(err);
        console.log(csv);
        writeAndDownload(csv, title, 'text/csv')
      });
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
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content ="The fastest, easiest and most reliable tool to convert JSON files to CSV or Excel, totally free, unlimited and open source" />
          <meta property="og:title" content="Free and Unlimited JSON to CSV converter"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="http://jsoncsv.org/"/>
          {/* <meta property="og:image" content="img/og-banner.png"> */}
          <meta property="og:description" content="The fastest, easiest and most reliable tool to convert JSON files to CSV or Excel, totally free, unlimited and open source"/>
        </Head>

        <main>
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
                  <div className="half-relative">
                    <button onClick={ this.forcedUpload }><img src="/cloud.svg" alt="Vercel Logo" className="btn-img" /> <br></br>Upload JSON file</button>
                    <p>{this.state.fileName}</p>
                    <input id="uploadInput" type="file"  accept="application/JSON" onChange={this.onFileChange} /> 
                  </div>
                  <div className="half-relative">
                    <textarea value={this.state.textAreaValue} id="txtJSON" cols="30" rows="5" onChange={this.updateTextAreaValue} placeholder="Write or Paste your JSON data"></textarea>
                  </div>
              </div>
              <div className="actions">
                  <div className="full-relative">
                    <button className="convert-btn" onClick={ this.onFileUpload }>Convert to CSV</button>
                  </div>
              </div>
          </div>

          <div className="grid">
            <a href="https://nextjs.org/docs" target="_blank"
            rel="noopener noreferrer" className="card">
              <h3>Buy me a coffee &rarr;</h3>
              <p>Donating any amount you help to keep the site online <span>without ads.</span></p>
            </a>

            <a href="https://github.com/matthsena/jsoncsv.org" target="_blank"
            rel="noopener noreferrer" className="card">
              <h3>See on GitHub &rarr;</h3>
              <p>Collaborate with the project or just take a look!</p>
            </a>
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
}


export default Home