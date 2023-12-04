package com.example.sudoku.buildlogic;

import com.example.sudoku.computationlogic.GameLogic;
import com.example.sudoku.persistance.LocalStorageImpl;
import com.example.sudoku.problemDomain.IStorage;
import com.example.sudoku.problemDomain.SudokuGame;
import com.example.sudoku.userinterface.IUserInterfaceContract;
import com.example.sudoku.userinterface.logic.ControlLogic;

import javax.sound.sampled.Control;
import java.io.IOException;

public class SudokuBuildLogic {

    public static void build(IUserInterfaceContract.View userInterface) throws IOException{
        SudokuGame initialState;
        IStorage storage = new LocalStorageImpl();

        try{
            initialState= storage.getGameData();

        } catch(IOException e){
            initialState= GameLogic.getNewGame();
            storage.updateGameData(initialState);
        }

        IUserInterfaceContract.EventListener uiLogic = new ControlLogic(storage, userInterface);

        userInterface.setListener(uiLogic);
        userInterface.updateBoard(initialState);
    }
}
