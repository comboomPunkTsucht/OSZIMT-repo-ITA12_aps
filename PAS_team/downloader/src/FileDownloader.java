import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileDownloader {
    private String url;

    public FileDownloader(String url) {
        this.url = url;
    }

    public void download() {
        try {
            URL fileUrl = new URL(url);
            String filename = fileUrl.getFile();
            filename = filename.substring(filename.lastIndexOf('/') + 1);
            Path filePath = Path.of(filename);
            
            try (InputStream in = fileUrl.openStream()) {
                Files.copy(in, filePath, StandardCopyOption.REPLACE_EXISTING);
            }
            
            System.out.println("File '" + filename + "' downloaded successfully.");
        } catch (IOException e) {
            System.out.println("Failed to download file from '" + url + "'.");
            e.printStackTrace();
        }
    }

    // Usage example
    public static void main(String[] args) {
        String url = "https://dropovercl.s3.amazonaws.com/5485fca9-05ca-41be-a79e-75d441fe3c34/eaabc1d1-92eb-407f-b332-c3ab635070ad/6ff61e0e-9e12-44c7-8942-e4bc57bf55b2.zip";
        FileDownloader downloader = new FileDownloader(url);
        downloader.download();
    }
}
