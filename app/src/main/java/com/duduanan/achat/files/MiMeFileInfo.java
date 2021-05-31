package com.duduanan.achat.files;
public class MiMeFileInfo {
		private String mimeTypeString;
		private String base64FileCode;
		
		public MiMeFileInfo(String mimeTypeString, String base64FileCode) {
			this.mimeTypeString = mimeTypeString;
			this.base64FileCode = base64FileCode;
		}

		public String getMimeTypeString() {
			return mimeTypeString;
		}

		public void setMimeTypeString(String mimeTypeString) {
			this.mimeTypeString = mimeTypeString;
		}

		public String getBase64FileCode() {
			return base64FileCode;
		}

		public void setBase64FileCode(String base64FileCode) {
			this.base64FileCode = base64FileCode;
		}
	}