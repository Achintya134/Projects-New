package com.example.sudoku;

import com.example.sudoku.buildlogic.SudokuBuildLogic;
import com.example.sudoku.userinterface.IUserInterfaceContract;
import com.example.sudoku.userinterface.UserInterfaceImpl;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class SudokuApplication extends Application {

    IUserInterfaceContract.View uiImpl;
    @Override
    public void start(Stage primaryStage) throws IOException {
        uiImpl = new UserInterfaceImpl(primaryStage);
        try{
            SudokuBuildLogic.build(uiImpl);
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}