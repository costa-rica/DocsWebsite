var path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const fs_promises = require('fs').promises;
const marked = require('marked');
require('dotenv').config();
const util = require('util');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public",)));

const header_title = "Docs Page"
const page_title = "Docs!!"

const config = {
    PROJECT_RESOURCES_DIR: process.env.PROJECT_RESOURCES_DIR,
    // anotherConfig: process.env.ANOTHER_CONFIG,
};
module.exports = config;// needed for the config object

// Middleware to render views with layout
function renderWithLayout(res, view, options) {
    console.log(view)
    options = options || {};
    //     options.body = options.body || '';
    options.title = page_title || 'Docs !!! - failed';
    options.header_title = header_title || "failed to get title";
    res.render('layout', { ...options, view_str: view });
}

async function convertMarkdown(filename) {
    const filePathAndName = path.join(config.PROJECT_RESOURCES_DIR,"markdown_docs", filename)
    const data = await fs_promises.readFile(filePathAndName, "utf8");
    console.log("data: " + data.substring(0, 15))
    return marked.parse(data)
}


app.get('/', (req, res) => {
    renderWithLayout(res, 'index', { title: 'Home' });
});

app.get('/ubuntu_stuff', async (req, res) => {
    try {
        const md = await convertMarkdown("UbuntuStuff.md");
        console.log("--- render page")
        // Render the page with the md data
        // res.render('ubuntu_stuff', { md });
        renderWithLayout(res, 'ubuntuStuff', {
            title: 'Ubuntu Stuff',
            markdown_content: md
        });
    } catch (err) {
        // Handle any errors that occur during the file reading process
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/surface_pro_4_stuff', (req, res) => {
    console.log("config.PROJECT_RESOURCES_DIR: " + config.PROJECT_RESOURCES_DIR)
    let filePathAndName = path.join(config.PROJECT_RESOURCES_DIR,"markdown_docs","NewSurfacePro4Os.md");
    fs.readFile(filePathAndName, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading markdown file');
        }
        // Convert markdown to HTML
        const htmlContent = marked.parse(data);
        renderWithLayout(res, 'surfacePro4Stuff', {
            title: 'Surface Pro 4 Stuff',
            content: htmlContent
        });
    });
});

app.get('/web_image/:filename',(req,res) =>{
    console.log("- in web_image")
    let filename = req.params.filename
    console.log(`gettting ${filename}`)
    let filePathAndName = path.join(config.PROJECT_RESOURCES_DIR,"images_website",filename)
    res.sendFile(filePathAndName)
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
