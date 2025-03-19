import boto3
import os
import time
from botocore.exceptions import ClientError

# AWS S3 Configuration
BUCKET_NAME = "cold-ecoinvent-data"
FOLDER_PATH = "/Users/troy/Downloads/ecoinvent 3.11_cutoff_lcia_ecoSpold02/datasets"  # Change to your local directory
S3_PREFIX = "ecoinvent_ecospold2_3_11_cutoff/datasets/lcia_data"  # Folder in S3 (optional, use '' for root)

# Initialize S3 client
s3_client = boto3.client("s3")

def file_exists_in_s3(bucket, s3_key):
    """Check if the file already exists in S3."""
    try:
        s3_client.head_object(Bucket=bucket, Key=s3_key)
        return True
    except ClientError as e:
        # If a 404 error is thrown, the file does not exist.
        if e.response['Error']['Code'] == "404":
            return False
        else:
            print(f"Error checking {s3_key}: {e}")
            return False

def upload_file(file_path, bucket, s3_key):
    """Uploads a file to S3."""
    try:
        s3_client.upload_file(file_path, bucket, s3_key)
        print(f"Uploaded: {file_path} → s3://{bucket}/{s3_key}")
    except Exception as e:
        print(f"Failed to upload {file_path}: {e}")
        raise

def format_time(seconds):
    """Format seconds into H:MM:SS format."""
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}"

def upload_folder(local_folder, bucket, s3_prefix):
    """Uploads all files in a folder to S3 if they don't exist, reporting progress, files/sec, and ETA."""
    # Build a list of all files and their S3 keys
    files_to_process = []
    for root, _, files in os.walk(local_folder):
        for file in files:
            local_file_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_file_path, local_folder)
            s3_key = os.path.join(s3_prefix, relative_path).replace("\\", "/")  # S3-friendly path
            files_to_process.append((local_file_path, s3_key))

    total_files = len(files_to_process)
    print(f"Total files found: {total_files}\n")

    uploaded_count = 0
    skipped_count = 0
    error_count = 0
    start_time = time.time()

    for idx, (local_file_path, s3_key) in enumerate(files_to_process, start=1):
        # Calculate elapsed time and processing rate
        elapsed = time.time() - start_time
        avg_time = elapsed / idx
        eta = avg_time * (total_files - idx)
        files_per_second = idx / elapsed if elapsed > 0 else 0

        print(f"Processing file {idx}/{total_files}")
        print(f"Rate: {files_per_second:.2f} files/sec | ETA: {format_time(eta)}")

        if file_exists_in_s3(bucket, s3_key):
            print(f"Skipping (exists): s3://{bucket}/{s3_key}\n")
            skipped_count += 1
        else:
            try:
                upload_file(local_file_path, bucket, s3_key)
                uploaded_count += 1
            except Exception:
                error_count += 1
            print()  # Blank line for readability

    print("Upload Summary:")
    print(f"  Uploaded: {uploaded_count}")
    print(f"  Skipped:  {skipped_count}")
    print(f"  Errors:   {error_count}")

if __name__ == "__main__":
    upload_folder(FOLDER_PATH, BUCKET_NAME, S3_PREFIX)
