// Initialize AWS SDK with your access key and secret access key
AWS.config.update({
    accessKeyId: 'AKIA4CL6BPW7XYOFNY77',
    secretAccessKey: 'h/9FPELUsmimcHVGLu612kUrICXgxtaUO1JdqL75',
    region: 'ap-south-1' // Replace with your AWS region
});

const s3 = new AWS.S3();

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
        alert('Please select a file to upload.');
        return;
    }

    const params = {
        Bucket: 'clouddemo99', // Replace with your S3 bucket name
        Key: selectedFile.name,
        Body: selectedFile
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading file: ' + err.message);
        } else {
            console.log('File uploaded:', data.Location);
            alert('File uploaded successfully.');
        }
    });
}

function retrieveFiles() {
    const params = {
        Bucket: 'clouddemo99' // Replace with your S3 bucket name
    };

    s3.listObjects(params, (err, data) => {
        if (err) {
            console.error('Error retrieving files:', err);
            alert('Error retrieving files: ' + err.message);
        } else {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';

            data.Contents.forEach((file) => {
                const listItem = document.createElement('li');
                listItem.textContent = file.Key;
                fileList.appendChild(listItem);
            });
        }
    });
}

function deleteFile() {
    const deleteInput = document.getElementById('deleteInput');
    const fileNameToDelete = deleteInput.value.trim();

    if (!fileNameToDelete) {
        alert('Please enter a file name to delete.');
        return;
    }

    const params = {
        Bucket: 'clouddemo99', // Replace with your S3 bucket name
        Key: fileNameToDelete
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.error('Error deleting file:', err);
            alert('Error deleting file: ' + err.message);
        } else {
            console.log('File deleted:', fileNameToDelete);
            alert('File deleted successfully.');
        }
    });
}
