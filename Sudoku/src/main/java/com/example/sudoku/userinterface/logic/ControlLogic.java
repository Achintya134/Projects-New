package com.example.sudoku.userinterface.logic;

import com.example.sudoku.computationlogic.GameLogic;
import com.example.sudoku.constants.GameState;
import com.example.sudoku.constants.Messages;
import com.example.sudoku.problemDomain.IStorage;
import com.example.sudoku.problemDomain.SudokuGame;
import com.example.sudoku.userinterface.IUserInterfaceContract;

import java.io.IOException;

public class ControlLogic implements IUserInterfaceContract.EventListener {

    private IStorage storage;
    private IUserInterfaceContract.View view;

    public ControlLogic(IStorage storage, IUserInterfaceContract.View view) {
        this.storage = storage;
        this.view = view;
    }

    @Override
    public void onSudokuInput(int x, int y, int input) {
        try{
            SudokuGame gameData = storage.getGameData();
            int[][] newGridState =gameData.getCopyOfGridState();
            newGridState[x][y] =input;

            gameData= new SudokuGame(
                    GameLogic.checkForCompletion(newGridState),newGridState
                    );
            storage.updateGameData(gameData);

            if(gameData.getGameState() == GameState.COMPLETE){
                view.showDialog(Messages.GAME_COMPLETE);

            }
            view.updateSquare(x, y, input);
        } catch(IOException e){
            e.printStackTrace();
            view.showError(Messages.ERROR_MESSAGE);

        }
    }

    @Override
    public void onDialogClick() {
        try{
            storage.updateGameData(
                    GameLogic.getNewGame()
            );
        } catch(IOException e){
            view.showError(Messages.ERROR_MESSAGE);

        }

    }
}
