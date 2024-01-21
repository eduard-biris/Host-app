import React, { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';

const ErrorDialog = lazy(() => import('MicroFrontendsApp/Dialogs/ErrorDialog'));
const AddProjectDialog = lazy(() => import('MicroFrontendsApp/Dialogs/AddProjectDialog'));
const DeleteProjectDialog = lazy(() => import('MicroFrontendsApp/Dialogs/DeleteProjectDialog'));
const DeleteIllustrationDialog = lazy(() => import('MicroFrontendsApp/Dialogs/DeleteIllustrationDialog'));

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showDeleteProjectDialog, setShowDeleteProjectDialog] = useState(false);
  const [showDeleteIllustrationDialog, setShowDeleteIllustrationDialog] = useState(false);
  
  return (
    <Suspense fallback={'Loading...'}>
      <ErrorDialog 
        showDialog={showErrorDialog}
        onConfirm={() => {setShowErrorDialog(false)}}
      />

      <AddProjectDialog
        showDialog={showAddProjectDialog}
        onConfirm={() => {setShowAddProjectDialog(false)}}
      />

      <DeleteProjectDialog
        showDialog={showDeleteProjectDialog}
        onCancel={() => {setShowDeleteProjectDialog(false)}}
        onConform={() => {setShowDeleteProjectDialog(false)}}
        projectName='Test Project'
      />

      <DeleteIllustrationDialog
        showDialog={showDeleteIllustrationDialog}
        onCancel={() => {setShowDeleteIllustrationDialog(false)}}
        onConform={() => {setShowDeleteIllustrationDialog(false)}}
        illustrationName='Test Illustration'
      />

      <button type='button' onClick={() => setShowDialog(!showDialog)}>ShowDialog</button>
      <button type='button' onClick={() => setShowErrorDialog(!showErrorDialog)}>ShowErrorDialog</button>
      <button type='button' onClick={() => setShowAddProjectDialog(!showAddProjectDialog)}>ShowAddProjectDialog</button>
      <button type='button' onClick={() => setShowDeleteProjectDialog(!showDeleteProjectDialog)}>showDeleteProjectDialog</button>
      <button type='button' onClick={() => setShowDeleteIllustrationDialog(!showDeleteIllustrationDialog)}>showDeleteIllustrationDialog</button>
    </Suspense>
  );
}

export default App;