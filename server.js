var path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const fs_promises = require('fs').promises;
const marked = require('marked');
require('dotenv').config();
// const util = require('util');

app.set('view engine', 'ejs');

const project_head_title = "Docs!!"
const project_header_title = "Docs Page"

const config = {
  PORT: process.env.PORT,
  PROJECT_RESOURCES_DIR: process.env.PROJECT_RESOURCES_DIR,
};
module.exports = config;// needed for the config object

// Middleware to serve static files
app.use(express.static('public'))

// Middleware to render views with layout
function renderWithLayout(res, view, options) {
  console.log(`- in renderWithLayout: ${view}`)
  options = options || {};
  options.project_head_title = project_head_title || 'Docs - missing';
  options.project_header_title = project_header_title || "failed to get title";
  var files = fs.readdirSync(path.join(config.PROJECT_RESOURCES_DIR, "markdown_docs"));
  let arry_files = []
  for (file of files) {
    var arr_name_and_extension = file.split(".")
    var extension = arr_name_and_extension[1]
    var name = arr_name_and_extension[0]
    if (extension == "md") {
      arry_files.push(name)
    }
  };
  options.arry_files = arry_files;
  // "..." spread operator, which is used to merge the options dictionary with view_str thereby becoming a single dictionary
  res.render('layout', { view_str: view, ...options });
}

async function convertMarkdown(filename) {
  console.log(`----> [in convertMarkdown] passed filename arg: ${filename}`)
  const filePathAndName = path.join(config.PROJECT_RESOURCES_DIR, "markdown_docs", filename)
  const data = await fs_promises.readFile(filePathAndName, "utf8");
  const markdown_to_html = marked.parse(data);
  // Extract the first <h1> tag content
  const h1Match = markdown_to_html.match(/<h1>(.*?)<\/h1>/);
  // extract only the text in the h1Match
  const markdown_page_title = h1Match ? h1Match[1] : '';
  let rest_of_html = markdown_to_html.replace(h1Match[0], '');
  return [markdown_page_title, rest_of_html];
}

app.get('/', (req, res) => {
  renderWithLayout(res, 'index', { title: 'Home' });
});

// async needed to wait fro the convertMarkdown to finish
app.get('/doc/:markdown_file', async (req, res) => {
  console.log("- in doc route")
  // use the :markdown_file arg passed in the url address
  let markdown_file_str = req.params.markdown_file + ".md"
  try {
    const [markdown_page_title, rest_of_html] = await convertMarkdown(markdown_file_str);
    renderWithLayout(res, 'doc', {markdown_page_title:markdown_page_title, converted_markdown_content: rest_of_html });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// This route is OBE and not used any more, but ...
// it's an example of in route wait for file to get read and populate the htmlContent variable
app.get('/surface_pro_4_stuff', (req, res) => {
  console.log("config.PROJECT_RESOURCES_DIR: " + config.PROJECT_RESOURCES_DIR)
  let filePathAndName = path.join(config.PROJECT_RESOURCES_DIR, "markdown_docs", "NewSurfacePro4Os.md");
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

app.get('/web_image/:filename', (req, res) => {
  let filename = req.params.filename
  let filePathAndName = path.join(config.PROJECT_RESOURCES_DIR, "images_website", filename)
  res.sendFile(filePathAndName)
})

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
