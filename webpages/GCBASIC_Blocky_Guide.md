# **GCBASIC Blockly Project Guide**  

## **Introduction**  

This guide provides a **straightforward, local installation** of GCBASIC for Blockly, allowing you to run it seamlessly on your system. By using **Python’s built-in `http.server`**, you can create a lightweight web server to host Blockly files without any complex setup.  

The process is **simple**:
1. Install Python.
2. Copy Blockly files to a directory.
3. Start a local web server with a single command.

Follow this guide to quickly set up your **GCBASIC_Blockly.html** project and begin experimenting with Blockly in a controlled environment.

---

## **Table of Contents**
- [What is Python's `http.server`?](#what-is-pythons-httpserver)
- [Why Use a Simple HTTP Server in Python?](#why-use-a-simple-http-server-in-python)
- [How to Start a Server (Install)](#how-to-start-a-server-install)
- [How to Start a Server (One-liner)](#how-to-start-a-server-one-liner)
- [How to Access the Server (One-liner)](#how-to-access-the-server-one-liner)
- [Best Place to Download Python](#best-place-to-download-python)
- [File Listing for GCBASIC Blockly Project](#file-listing-for-gcbasic-blockly-project)
  - [Core Files](#core-files)
  - [Supporting Files](#supporting-files)
  - [Optional/Generated Files](#optionalgenerated-files)
  - [Directory Structure Suggestion](#directory-structure-suggestion)
  - [Notes](#notes)

---

## **What is Python's `http.server`?**

Python's `http.server` is a built-in module that allows you to create a simple HTTP server to serve files from a directory. It provides a lightweight way to host static files, such as HTML, JavaScript, and CSS, over a network or locally.

- **Purpose**: Ideal for testing, development, and quick file sharing.
- **Limitations**: Not recommended for production use due to lack of security features, performance optimization, or scalability.

---

## **Why Use a Simple HTTP Server in Python?**

Using a simple HTTP server in Python offers several advantages for working with Blockly and your `GCBASIC_Blockly.html` project:

- **Easy File Sharing** – Share your Blockly workspace with others on the same network without configuring a complex server. Access it via a local IP (e.g., `http://192.168.1.x:8000/GCBASIC_Blockly.html`).
- **Quick Testing** – Test your Blockly application locally without needing Apache, Nginx, or other web server installations, speeding up development cycles.
- **Development Convenience** – Serve files from any directory for local debugging, allowing real-time edits to HTML and JavaScript files with immediate browser reflection.
- **Cross-Platform** – Works on Windows, macOS, and Linux with Python installed, making it universally accessible.

---

## **How to Start a Server (Install)**  

Setting up a Python HTTP server is low-risk and requires minimal effort. Follow these steps:

1. **Install Python**:  
   - Download and install Python from the official site ([Python.org](https://www.python.org/downloads/)) or your package manager (e.g., `apt`, `brew`).  
   - Ensure Python 3.x is installed (e.g., check with `python3 --version` or `python --version`).  
   - This process is safe and reversible, with no system-level changes required.  

2. **Copy Files to a Folder**:  
   - Create a dedicated directory (e.g., `BlocklyProject`).  
   - Copy your `GCBASIC_Blockly.html` file and any associated text files (e.g., `my_blockly_project.xml`, `changelog.txt`, `GCBASIC_Blockly_Guide.md`) into this folder. See the [File Listing](#file-listing-for-gcbasic-blockly-project) for details.  

3. **Open a Command Prompt**:  
   - Navigate to the folder using a terminal or command prompt:  
     - **Windows**: `cd path\to\BlocklyProject`  
     - **macOS/Linux**: `cd /path/to/BlocklyProject`  
   - Ensure you’re in the correct directory before proceeding.  

---

## **How to Start a Server (One-liner)**  

To start a simple HTTP server in Python, use this one-liner command in your terminal or command prompt:


    python -m http.server 8000



## **How to Access the Server (One-liner)**  

After running the server, access your Blockly setup in a browser using:

```
http://localhost:8000/GCBASIC_Blockly.html
```

## **Best Place to Download Python**  

The best place to download Python is the **official Python website**: [Python.org](https://www.python.org/downloads/). It provides the latest stable releases for Windows, macOS, and Linux, along with installation guides and documentation.

Alternatively, if you're using Windows, you can also download Python from the **Microsoft Store**: [Python 3.11](https://apps.microsoft.com/detail/9NRWMJP3717K?launch=true&mode=full&hl=en-us&gl=gb).
