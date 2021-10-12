import * as vscode from 'vscode';
import { buildTemplate } from './template-builder';


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-extensions.newComponent', async () => {
		let componentName = await vscode.window.showInputBox({
			prompt: 'Enter the name of your component'
		});

		if (!vscode.workspace.workspaceFolders) {
			vscode.window.showErrorMessage('You must be in a workspace to access this command.');
			return;
		}

		if (componentName) {
			componentName = `${componentName[0].toUpperCase()}${componentName.slice(1)}`
			
			const templateText = buildTemplate(componentName);

			const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
			const edit = new vscode.WorkspaceEdit();
			const componentFilePath = vscode.Uri.file(wsPath + `/src/Components/${componentName}Component/${componentName}.jsx`);
			const styleFilePath = vscode.Uri.file(wsPath + `/src/Components/${componentName}Component/${componentName}.scss`);
			edit.createFile(componentFilePath, { ignoreIfExists: true });
			edit.createFile(styleFilePath, { ignoreIfExists: true });
			edit.insert(componentFilePath, new vscode.Position(0, 0), templateText);
			vscode.workspace.applyEdit(edit);
			vscode.workspace.saveAll(false);
		}
	});


	context.subscriptions.push(disposable);
}



// this method is called when your extension is deactivated
export function deactivate() { }
