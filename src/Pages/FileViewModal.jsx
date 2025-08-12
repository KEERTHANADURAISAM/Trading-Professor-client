
import React, { useState, useEffect } from 'react';
import { 
 X

} from 'lucide-react';



// File View Modal
const FileViewModal = ({ showFileModal, selectedFile, setShowFileModal, setSelectedFile }) => {
  if (!showFileModal || !selectedFile) return null;

  const handleClose = () => {
    setShowFileModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 h-96 md:h-[500px]">
          <iframe
            src={selectedFile.url}
            className="w-full h-full rounded-lg border border-white/10"
            title={selectedFile.name}
          />
        </div>
        
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default FileViewModal